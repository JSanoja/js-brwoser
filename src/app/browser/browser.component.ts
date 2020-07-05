import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-browser",
  templateUrl: "./browser.component.html",
  styleUrls: ["./browser.component.scss"],
})
export class BrowserComponent implements OnInit {
  cover: string = "";
  items: any;
  path = "";
  lastPath = "";
  isVideo: boolean = false;
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.http.get("/api/browse?path=" + this.path).subscribe((resp) => {
      this.items = resp;
      this.cover = this.items ? this.items.cover : "";
      console.log(this.items, this.cover);
    });
  }
  getCoverFolder(folder) {
    let pathRep = this.path == "" ? "" : this.path + "/";
    let src = "/source/" + pathRep + folder + "/cover.jpg";
    return src;
  }
  public sanitizeImage(image: string) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${encodeURI(image)})`);
  }
  selectFolder(item) {
    this.lastPath = this.path;
    this.path = this.path + "/" + item;
    this.items = null;
    this.getItems();
    console.log(this.path, this.lastPath);
  }
  playVideo(item) {
    this.isVideo = true;
    this.lastPath = this.path;
    this.path = this.path + "/" + item;
    this.items = null;
    console.log(this.path, this.lastPath);
  }
}
