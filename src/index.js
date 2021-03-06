"use strict";

import "babel/polyfill";
import "isomorphic-fetch";

import Api from "./api";
import Collection from "./collection";


const DEFAULT_BUCKET_NAME = "default";


export default class Kinto {
  constructor(options = {}) {
    this._options = options;
    this._collections = {};
  }

  collection(collName) {
    if (!collName)
      throw new Error("missing collection name");

    const bucket = this._options.bucket || DEFAULT_BUCKET_NAME;
    const api = new Api(this._options.remote || "http://0.0.0.0:8888/v1", {
      headers: this._options.headers || {}
    });

    if (!this._collections.hasOwnProperty(collName))
      this._collections[collName] = new Collection(bucket, collName, api);

    return this._collections[collName];
  }
}
