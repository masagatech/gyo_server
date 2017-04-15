webpackJsonp([2], {
    244: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1);
        a.d(n, "a", (function() { return s }));
        var s = (function() {
            function r() { this._state = {} }
            return Object.defineProperty(r.prototype, "state", { get: function() { return this._state = this._clone(this._state) }, set: function(r) { throw new Error("do not mutate the `.state` directly") }, enumerable: !0, configurable: !0 }), r.prototype.get = function(r) { var n = this.state; return n.hasOwnProperty(r) ? n[r] : n }, r.prototype.set = function(r, n) { return this._state[r] = n }, r.prototype._clone = function(r) { return JSON.parse(JSON.stringify(r)) }, r
        })();
        s = i.a([a.i(e.Injectable)()], s)
    },
    281: function(r, n, a) {
        "use strict";
        var i = a(101),
            e = a(1);
        a.d(n, "a", (function() { return o })), a.d(n, "b", (function() { return l }));
        var s = [],
            t = function(r) { return r };
        a.i(e.enableProdMode)(), t = function(r) { return a.i(i.disableDebugTools)(), r }, s = s.slice();
        var o = t,
            l = s.slice()
    },
    367: function(r, n, a) {
        "use strict";
        var i = a(572);
        a.d(n, "a", (function() { return i.a }))
    },
    368: function(r, n, a) {
        "use strict";
        var i = a(575);
        a.d(n, "a", (function() { return i.a }))
    },
    434: function(r, n) {
        function a(r) { throw new Error("Cannot find module '" + r + "'.") }
        a.keys = function() { return [] }, a.resolve = a, r.exports = a, a.id = 434
    },
    436: function(r, n, a) {
        "use strict";
        var i = a(569);
        a.d(n, "a", (function() { return i.a }))
    },
    458: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(230),
            t = a(566),
            o = a(408),
            l = (a.n(o), a(407)),
            c = (a.n(l), a(726));
        a.n(c);
        a.d(n, "a", (function() { return d }));
        var d = (function() {
            function r(r) { this._http = r, this.global = new t.a }
            return r.prototype.post = function(r, n) {
                var a = JSON.stringify(n),
                    i = new s.b({ "Content-Type": "application/json" }),
                    e = new s.c({ headers: i, method: "post" });
                return this._http.post(this.global.serviceurl + r, a, e).map((function(r) { return r.json() })).catch(this.handleError)
            }, r.prototype.get = function(r, n) { return this._http.get(this.global.serviceurl + r + "?" + $.param(n)).toPromise().then((function(r) { return r.json().data })).then((function(r) { return r })) }, r.prototype.handleError = function(r) { return console.error(r), c.Observable.throw(r.json().error || " error") }, r
        })();
        d = i.a([a.i(e.Injectable)(), i.b("design:paramtypes", [s.d])], d)
    },
    566: function(r, n, a) {
        "use strict";
        a.d(n, "a", (function() { return i }));
        var i = (function() {
            function r() { this.serviceurl = "http://35.154.27.42:8081/goyoapi/" }
            return r
        })()
    },
    567: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(458);
        a.d(n, "a", (function() { return t }));
        var t = o = (function() {
            function r() {}
            return r.forRoot = function() { return { ngModule: o, providers: [s.a] } }, r
        })();
        t = o = i.a([a.i(e.NgModule)({})], t);
        var o
    },
    568: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(244);
        a.d(n, "a", (function() { return t }));
        var t = (function() {
            function r(r) { this.appState = r, this.angularclassLogo = "assets/img/angularclass-avatar.png", this.name = "Angular 2 Webpack Starter", this.url = "https://twitter.com/AngularClass", this.themes = [{ nm: "red", disp: "Red" }, { nm: "pink", disp: "pink" }, { nm: "purple", disp: "purple" }, { nm: "deep-purple", disp: "Deep Purple" }, { nm: "indigo", disp: "indigo" }, { nm: "blue", disp: "blue" }, { nm: "light-blue", disp: "Light Blue" }, { nm: "cyan", disp: "cyan" }, { nm: "teal", disp: "teal" }, { nm: "green", disp: "green" }, { nm: "light-green", disp: "Light Green" }, { nm: "lime", disp: "lime" }, { nm: "yellow", disp: "yellow" }, { nm: "amber", disp: "amber" }, { nm: "orange", disp: "orange" }, { nm: "deep-orange", disp: "deep-orange" }, { nm: "brown", disp: "brown" }, { nm: "grey", disp: "grey" }, { nm: "blue-grey", disp: "blue-grey" }, { nm: "black", disp: "black" }] }
            return r.prototype.ngOnInit = function() { console.log("Initial App State", this.appState.state) }, r.prototype.ngAfterViewInit = function() { console.log("Initial App State view"), loader.loadall() }, r.prototype.changeSkin = function(r) { loader.skinChanger(r) }, r
        })();
        t = i.a([a.i(e.Component)({ selector: "app", encapsulation: e.ViewEncapsulation.None, template: a(723) }), i.b("design:paramtypes", [s.a])], t)
    },
    569: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(101),
            s = a(456),
            t = a(230),
            o = a(100),
            l = a(567),
            c = a(1),
            d = a(282),
            p = (a.n(d), a(457)),
            u = a(281),
            v = a(571),
            h = a(568),
            f = a(570),
            m = a(244),
            g = a(367),
            b = a(368),
            y = a(721),
            w = (a.n(y), a(722));
        a.n(w);
        a.d(n, "a", (function() { return k }));
        var S = f.a.concat([m.a]),
            k = (function() {
                function r(r, n) { this.appRef = r, this.appState = n }
                return r.prototype.hmrOnInit = function(r) {
                    if (r && r.state) {
                        if (console.log("HMR store", JSON.stringify(r, null, 2)), this.appState._state = r.state, "restoreInputValues" in r) {
                            var n = r.restoreInputValues;
                            setTimeout(n)
                        }
                        this.appRef.tick(), delete r.state, delete r.restoreInputValues
                    }
                }, r.prototype.hmrOnDestroy = function(r) {
                    var n = this.appRef.components.map((function(r) { return r.location.nativeElement })),
                        i = this.appState._state;
                    r.state = i, r.disposeOldHosts = a.i(d.createNewHosts)(n), r.restoreInputValues = a.i(d.createInputTransfer)(), a.i(d.removeNgStyles)()
                }, r.prototype.hmrAfterDestroy = function(r) { r.disposeOldHosts(), delete r.disposeOldHosts }, r
            })();
        k = i.a([a.i(c.NgModule)({ bootstrap: [h.a], declarations: [h.a, g.a, b.a], imports: [e.BrowserModule, s.FormsModule, t.a, o.CommonModule, p.RouterModule.forRoot(v.a, { useHash: !0, preloadingStrategy: p.PreloadAllModules }), l.a.forRoot()], providers: [u.b, S] }), i.b("design:paramtypes", [c.ApplicationRef, m.a])], k)
    },
    570: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(0),
            t = (a.n(s), a(406));
        a.n(t);
        a.d(n, "a", (function() { return l }));
        var o = (function() {
            function r() {}
            return r.prototype.resolve = function(r, n) { return s.Observable.of({ res: "I am data" }) }, r
        })();
        o = i.a([a.i(e.Injectable)()], o);
        var l = [o]
    },
    571: function(r, n, a) {
        "use strict";
        var i = a(367),
            e = a(368);
        a.d(n, "a", (function() { return s }));
        var s = [{ path: "home", component: i.a }, { path: "", loadChildren: function() { return a.e(0).then(a.bind(null, 990)).then((function(r) { return r.ModuleModule })) } }, { path: "**", component: e.a }]
    },
    572: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(244),
            t = a(573);
        a.d(n, "a", (function() { return o }));
        var o = (function() {
            function r(r, n) { this.appState = r, this.title = n, this.localState = { value: "" } }
            return r.prototype.ngOnInit = function() { console.log("hello `Home` component") }, r.prototype.submitState = function(r) { console.log("submitState", r), this.appState.set("value", r), this.localState.value = "" }, r
        })();
        o = i.a([a.i(e.Component)({ selector: "home", providers: [t.a], styles: [a(987)], template: a(724) }), i.b("design:paramtypes", [s.a, t.a])], o)
    },
    573: function(r, n, a) {
        "use strict";
        var i = a(574);
        a.d(n, "a", (function() { return i.a }))
    },
    574: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1),
            s = a(230);
        a.d(n, "a", (function() { return t }));
        var t = (function() {
            function r(r) { this.http = r, this.value = "Angular 2" }
            return r.prototype.getData = function() { return console.log("Title#getData(): Get Data"), { value: "AngularClass" } }, r
        })();
        t = i.a([a.i(e.Injectable)(), i.b("design:paramtypes", [s.d])], t)
    },
    575: function(r, n, a) {
        "use strict";
        var i = a(49),
            e = a(1);
        a.d(n, "a", (function() { return s }));
        var s = (function() {
            function r() {}
            return r
        })();
        s = i.a([a.i(e.Component)({ selector: "no-content", template: "\n    <div>\n      <h1>404: page missing</h1>\n    </div>\n  " })], s)
    },
    719: function(r, n, a) { n = r.exports = a(720)(), n.push([r.i, "", ""]) },
    721: function(r, n) {},
    722: function(r, n) {},
    723: function(r, n) { r.exports = '<!--<nav>\r\n    <a [routerLink]=" [\'./\'] " routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">\r\n        Index\r\n      </a>\r\n    <a [routerLink]=" [\'./home\'] " routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">\r\n        Home\r\n      </a>\r\n    <a [routerLink]=" [\'./detail\'] " routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">\r\n        Detail\r\n      </a>\r\n    <a [routerLink]=" [\'./barrel\'] " routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">\r\n        Barrel\r\n      </a>\r\n    <a [routerLink]=" [\'./about\'] " routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">\r\n        About\r\n      </a>\r\n</nav>\r\n\r\n<main>\r\n    <router-outlet></router-outlet>\r\n</main>\r\n\r\n<pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>\r\n\r\n<footer>\r\n    <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>\r\n    <div>\r\n        <a [href]="url">\r\n            <img [src]="angularclassLogo" width="25%">\r\n        </a>\r\n    </div>\r\n</footer>-->\r\n<!-- Page Loader -->\r\n<!-- Page Loader -->\r\n<div class="page-loader-wrapper">\r\n    <div class="loader">\r\n        <div class="preloader">\r\n            <div class="spinner-layer pl-red">\r\n                <div class="circle-clipper left">\r\n                    <div class="circle"></div>\r\n                </div>\r\n                <div class="circle-clipper right">\r\n                    <div class="circle"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <p>Please wait...</p>\r\n    </div>\r\n</div>\r\n<!-- #END# Page Loader -->\r\n<!-- Overlay For Sidebars -->\r\n<div class="overlay"></div>\r\n<!-- #END# Overlay For Sidebars -->\r\n<!-- Search Bar -->\r\n<div class="search-bar">\r\n    <div class="search-icon">\r\n        <i class="material-icons">search</i>\r\n    </div>\r\n    <input type="text" placeholder="START TYPING...">\r\n    <div class="close-search">\r\n        <i class="material-icons">close</i>\r\n    </div>\r\n</div>\r\n<!-- #END# Search Bar -->\r\n<!-- Top Bar -->\r\n<nav class="navbar">\r\n    <div class="container-fluid">\r\n        <div class="navbar-header">\r\n            <a href="javascript:void(0);" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false"></a>\r\n            <a href="javascript:void(0);" class="bars"></a>\r\n            <a class="navbar-brand" href="index.html">GOYO Marketing</a>\r\n        </div>\r\n        <div class="collapse navbar-collapse" id="navbar-collapse">\r\n            <ul class="nav navbar-nav navbar-right">\r\n                <!-- Call Search -->\r\n                <li><a href="javascript:void(0);" class="js-search" data-close="true"><i class="material-icons">search</i></a></li>\r\n                <!-- #END# Call Search -->\r\n                <!-- Notifications -->\r\n                <li class="dropdown">\r\n                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">\r\n                        <i class="material-icons">notifications</i>\r\n                        <span class="label-count hide">0</span>\r\n                    </a>\r\n                    <ul class="dropdown-menu">\r\n                        <li class="header">NOTIFICATIONS</li>\r\n                        <li class="body">\r\n                            <ul class="menu">\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-light-green">\r\n                                            <i class="material-icons">person_add</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4>12 new members joined</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 14 mins ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-cyan">\r\n                                            <i class="material-icons">add_shopping_cart</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4>4 sales made</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 22 mins ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-red">\r\n                                            <i class="material-icons">delete_forever</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4><b>Nancy Doe</b> deleted account</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 3 hours ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-orange">\r\n                                            <i class="material-icons">mode_edit</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4><b>Nancy</b> changed name</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 2 hours ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-blue-grey">\r\n                                            <i class="material-icons">comment</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4><b>John</b> commented your post</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 4 hours ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-light-green">\r\n                                            <i class="material-icons">cached</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4><b>John</b> updated status</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> 3 hours ago\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <div class="icon-circle bg-purple">\r\n                                            <i class="material-icons">settings</i>\r\n                                        </div>\r\n                                        <div class="menu-info">\r\n                                            <h4>Settings updated</h4>\r\n                                            <p>\r\n                                                <i class="material-icons">access_time</i> Yesterday\r\n                                            </p>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                        <li class="footer">\r\n                            <a href="javascript:void(0);">View All Notifications</a>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n                <!-- #END# Notifications -->\r\n                <!-- Tasks -->\r\n                <li class="dropdown">\r\n                    <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button">\r\n                        <i class="material-icons">flag</i>\r\n                        <span class="label-count hide">0</span>\r\n                    </a>\r\n                    <ul class="dropdown-menu">\r\n                        <li class="header">TASKS</li>\r\n                        <li class="body">\r\n                            <ul class="menu tasks">\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <h4>\r\n                                            Footer display issue\r\n                                            <small>32%</small>\r\n                                        </h4>\r\n                                        <div class="progress">\r\n                                            <div class="progress-bar bg-pink" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 32%">\r\n                                            </div>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <h4>\r\n                                            Make new buttons\r\n                                            <small>45%</small>\r\n                                        </h4>\r\n                                        <div class="progress">\r\n                                            <div class="progress-bar bg-cyan" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 45%">\r\n                                            </div>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <h4>\r\n                                            Create new dashboard\r\n                                            <small>54%</small>\r\n                                        </h4>\r\n                                        <div class="progress">\r\n                                            <div class="progress-bar bg-teal" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 54%">\r\n                                            </div>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <h4>\r\n                                            Solve transition issue\r\n                                            <small>65%</small>\r\n                                        </h4>\r\n                                        <div class="progress">\r\n                                            <div class="progress-bar bg-orange" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 65%">\r\n                                            </div>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                                <li>\r\n                                    <a href="javascript:void(0);">\r\n                                        <h4>\r\n                                            Answer GitHub questions\r\n                                            <small>92%</small>\r\n                                        </h4>\r\n                                        <div class="progress">\r\n                                            <div class="progress-bar bg-purple" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 92%">\r\n                                            </div>\r\n                                        </div>\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                        <li class="footer">\r\n                            <a href="javascript:void(0);">View All Tasks</a>\r\n                        </li>\r\n                    </ul>\r\n                </li>\r\n                <!-- #END# Tasks -->\r\n                <li class="pull-right"><a href="javascript:void(0);" class="js-right-sidebar" data-close="true"><i class="material-icons">more_vert</i></a></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n<!-- #Top Bar -->\r\n<section>\r\n    <!-- Left Sidebar -->\r\n    <aside id="leftsidebar" class="sidebar">\r\n        <!-- User Info -->\r\n        <div class="user-info">\r\n            <!--<div class="image">\r\n                <img src="images/user.png" width="48" height="48" alt="User" />\r\n            </div>-->\r\n            <div class="info-container">\r\n                <div class="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">John Doe</div>\r\n                <div class="email">john.doe@example.com</div>\r\n                <div class="btn-group user-helper-dropdown">\r\n                    <i class="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">keyboard_arrow_down</i>\r\n                    <ul class="dropdown-menu pull-right">\r\n                        <li><a href="javascript:void(0);"><i class="material-icons">person</i>Profile</a></li>\r\n                        <li role="seperator" class="divider"></li>\r\n                        <li><a href="javascript:void(0);"><i class="material-icons">group</i>Followers</a></li>\r\n                        <li><a href="javascript:void(0);"><i class="material-icons">shopping_cart</i>Sales</a></li>\r\n                        <li><a href="javascript:void(0);"><i class="material-icons">favorite</i>Likes</a></li>\r\n                        <li role="seperator" class="divider"></li>\r\n                        <li><a href="javascript:void(0);"><i class="material-icons">input</i>Sign Out</a></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- #User Info -->\r\n        <!-- Menu -->\r\n        <div class="menu">\r\n            <ul class="list">\r\n                <li class="header">MAIN NAVIGATION</li>\r\n                <li>\r\n                    <a [routerLink]="[\'./home\']" routerLinkActivate="active">\r\n                        <i class="material-icons">home</i>\r\n                        <span>Home</span>\r\n                    </a>\r\n                </li>\r\n                <li>\r\n                    <a [routerLink]="[\'./surveyentries\']" routerLinkActivate="active">\r\n                        <i class="material-icons">text_fields</i>\r\n                        <span>App Entries</span>\r\n                    </a>\r\n                </li>\r\n\r\n            </ul>\r\n        </div>\r\n        <!-- #Menu -->\r\n        <!-- Footer -->\r\n        <div class="legal">\r\n            <div class="copyright">\r\n                &copy; 2016 <a href="javascript:void(0);">Masagatech</a>.\r\n            </div>\r\n            <div class="version">\r\n                <b>Version: </b> 1.0.0\r\n            </div>\r\n        </div>\r\n        <!-- #Footer -->\r\n    </aside>\r\n    <!-- #END# Left Sidebar -->\r\n    <!-- Right Sidebar -->\r\n    <aside id="rightsidebar" class="right-sidebar">\r\n        <ul class="nav nav-tabs tab-nav-right" role="tablist">\r\n            <li role="presentation" class="active"><a href="#skins" data-toggle="tab">SKINS</a></li>\r\n            <li role="presentation"><a href="#settings" data-toggle="tab">SETTINGS</a></li>\r\n        </ul>\r\n        <div class="tab-content">\r\n            <div role="tabpanel" class="tab-pane fade in active in active" id="skins">\r\n                <ul class="demo-choose-skin">\r\n                    <li *ngFor="let item of themes" (click)="changeSkin(item.nm)" attr.data-theme="{{item.nm}}">\r\n                        <div class="{{item.nm}}"></div>\r\n                        <span>{{item.disp}}</span>\r\n                    </li>\r\n\r\n                </ul>\r\n            </div>\r\n            <div role="tabpanel" class="tab-pane fade" id="settings">\r\n                <div class="demo-settings">\r\n                    <p>GENERAL SETTINGS</p>\r\n                    <ul class="setting-list">\r\n                        <li>\r\n                            <span>Report Panel Usage</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox" checked><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                        <li>\r\n                            <span>Email Redirect</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox"><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                    <p>SYSTEM SETTINGS</p>\r\n                    <ul class="setting-list">\r\n                        <li>\r\n                            <span>Notifications</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox" checked><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                        <li>\r\n                            <span>Auto Updates</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox" checked><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                    <p>ACCOUNT SETTINGS</p>\r\n                    <ul class="setting-list">\r\n                        <li>\r\n                            <span>Offline</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox"><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                        <li>\r\n                            <span>Location Permission</span>\r\n                            <div class="switch">\r\n                                <label><input type="checkbox" checked><span class="lever"></span></label>\r\n                            </div>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </aside>\r\n    <!-- #END# Right Sidebar -->\r\n</section>\r\n<section class="content">\r\n    <div class="container-fluid">\r\n        <router-outlet></router-outlet>\r\n\r\n        <!-- #END# Browser Usage -->\r\n    </div>\r\n</section>' },
    724: function(r, n) { r.exports = '<div class="block-header">\r\n    <h2>DASHBOARD</h2>\r\n</div>\r\n\r\n\r\n<div class="row clearfix">\r\n    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\r\n        <div class="info-box bg-pink hover-expand-effect">\r\n            <div class="icon">\r\n                <i class="material-icons">playlist_add_check</i>\r\n            </div>\r\n            <div class="content">\r\n                <div class="text">NEW TASKS</div>\r\n                <div class="number count-to" data-from="0" data-to="125" data-speed="15" data-fresh-interval="20"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\r\n        <div class="info-box bg-cyan hover-expand-effect">\r\n            <div class="icon">\r\n                <i class="material-icons">help</i>\r\n            </div>\r\n            <div class="content">\r\n                <div class="text">NEW TICKETS</div>\r\n                <div class="number count-to" data-from="0" data-to="257" data-speed="1000" data-fresh-interval="20"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\r\n        <div class="info-box bg-light-green hover-expand-effect">\r\n            <div class="icon">\r\n                <i class="material-icons">forum</i>\r\n            </div>\r\n            <div class="content">\r\n                <div class="text">NEW COMMENTS</div>\r\n                <div class="number count-to" data-from="0" data-to="243" data-speed="1000" data-fresh-interval="20"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">\r\n        <div class="info-box bg-orange hover-expand-effect">\r\n            <div class="icon">\r\n                <i class="material-icons">person_add</i>\r\n            </div>\r\n            <div class="content">\r\n                <div class="text">NEW VISITORS</div>\r\n                <div class="number count-to" data-from="0" data-to="1225" data-speed="1000" data-fresh-interval="20"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>' },
    987: function(r, n, a) {
        var i = a(719);
        r.exports = "string" == typeof i ? i : i.toString()
    },
    988: function(r, n, a) {
        "use strict";

        function i() { return a.i(e.a)().bootstrapModule(o.a).then(s.a).catch((function(r) { return console.error(r) })) }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var e = a(435),
            s = a(281),
            t = a(282),
            o = (a.n(t), a(436));
        n.main = i, a.i(t.bootloader)(i)
    }
}, [988]);