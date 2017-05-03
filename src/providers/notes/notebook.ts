import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Dropbox } from '../../providers/dropbox';

export enum NoteStatus {
  MISSING,
  LOCAL,
  CURRENT,
  BEHIND,
  NEW
}
export class NoteReference {
  public id: string;
  public rev: string;
  public tag: string;;
  public name: string;
  public path_lower: string;
  public path_display: string;
  public localStore_integrity: boolean;
  public localStore_status: NoteStatus;

  constructor(o) {
    this.id = o.id;
    this.rev = o.rev;
    this.tag = o[".tag"];
    this.name = o.name;
    this.path_lower = o.path_lower;
    this.path_display = o.path_display;
  }

  updateStatus(status: NoteStatus, integrity: boolean) {
    this.localStore_status = status;
    this.localStore_integrity = integrity;
  }
}

@Injectable()
export class NoteReferenceStore {

  private reject;
  private cursor;

  private inMemoryPathMap = {};
  private inMemoryStore = {}

  constructor(
    private localStore: Storage,
    private cloudStore: Dropbox
    ) { }

  readFromLocalStore2() {
    if (this.cursor != null) {
      return this.localStore.get("NODE_STORE").then(
            (data) => {
              console.log("Step2a");
              let ns = JSON.parse(data);
              this.inMemoryStore = ns.inMemoryStore;
              this.inMemoryPathMap = ns.inMemoryPathMap;
            }
    )
    } else {
      return new Promise((rs,rj)=>{ console.log("Step2b"); rs(); });
    }
  }

  readFromLocalStore3(r) {
    return this.getDir(
        () => { console.log("Step3a"); r(); },
        () => { });
  }

  readFromLocalStore(resolve) {
    return this.localStore.get("CURSOR")
      .then((data) => { this.cursor = null; console.log("Step1"); })
      .then((data) => { console.log("Step2"); return this.readFromLocalStore2(); })
      .then((data) => { console.log("Step3"); return this.readFromLocalStore3(resolve); });
  }

  add_path_link(key: string) {
    let p = key.substring(0, key.lastIndexOf('/'));
    if (this.inMemoryPathMap[p] == undefined) this.inMemoryPathMap[p] = new Set();
    this.inMemoryPathMap[p].add(key);
  }

  remove_path_link(key: string) {
    let p = key.substring(0, key.lastIndexOf('/'));
    let set = this.inMemoryPathMap[p];
    if (set == undefined) return;
    set.delete(key);
    if (set.size == 0) delete this.inMemoryPathMap[p];
  }

  add(noteInfo) {
    if (noteInfo.name == null || noteInfo.name.charAt(0) == ".") return;
    let key: string = noteInfo.path_lower;
    let newNote = new NoteReference(noteInfo);
    this.inMemoryStore[key] = newNote;
    this.add_path_link(key);
    //this.check_cache(key, newNote);
  }

  remove(noteInfo) {
    let key: string = noteInfo.path_lower
    let oldNote: NoteReference = this.inMemoryStore[key];
    if (oldNote == undefined) return;
    if (oldNote.localStore_integrity) {
      this.remove_path_link(key);
      delete this.inMemoryStore[key];
      this.localStore.remove(key);
    }
  }

  check_cache(key: string, note: NoteReference) {
    this.localStore.get(key).then(
      (cachedNode) => {
        if (cachedNode == null)
        {
          note.updateStatus(NoteStatus.MISSING, true);
        } else if (cachedNode.rev == note.rev) {
          if (cachedNode.changed) note.updateStatus(NoteStatus.LOCAL, true);
          else note.updateStatus(NoteStatus.CURRENT, true);
        } else if (!cachedNode.changed) {
          note.updateStatus(NoteStatus.BEHIND, true);
        } else {
          if (cachedNode.rev == "NEW") note.updateStatus(NoteStatus.NEW, false);
          else note.updateStatus(NoteStatus.LOCAL, false);
        }
      },
      (err) => { note.updateStatus(NoteStatus.MISSING, true); }
    );
  }

  getNotes(key) {
		let list = [];
		let items = this.inMemoryPathMap[key];
		if (items == undefined) return list;
    items.forEach(
      (item) => list.push(this.inMemoryStore[item])
    );
		//list.sort(NoteMetadata.sort_by_name);
		return list;
  }

  getDir(resolve: Function, reject: Function) {
    if (reject == null) reject = this.reject;
    return this.cloudStore.getAllFolders(this.cursor).subscribe(
      (data) => {  this.processFiles(data); resolve(data); },
      (err) => { reject(err); }
    );
  }

  processFiles(data) {
    // Error on has_more at the moment.
    if (data.has_more) console.log("Error files bigger than intial download");

    this.cursor = data.cursor;
    for (let entry of data.entries) {
      if (entry[".tag"] == "deleted") this.remove(entry);
      else this.add(entry);
    }
    let ns = { inMemoryStore: this.inMemoryStore, inMemoryPathMap: this.inMemoryPathMap }
    this.localStore.set("NODE_STORE", JSON.stringify(ns));
    this.localStore.set("CURSOR", JSON.stringify(this.cursor));
    console.log(JSON.stringify(ns));
  }
}


