/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+c+csharp+cpp+diff+markdown&plugins=show-language+toolbar+diff-highlight */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = function(e) {
    var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      t = 0,
      r = {},
      a = {
        manual: e.Prism && e.Prism.manual,
        disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof i ? new i(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
          },
          type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          },
          objId: function(e) {
            return e.__id || Object.defineProperty(e, "__id", {
              value: ++t
            }), e.__id
          },
          clone: function e(n, t) {
            var r, i;
            switch (t = t || {}, a.util.type(n)) {
              case "Object":
                if (i = a.util.objId(n), t[i]) return t[i];
                for (var l in r = {}, t[i] = r, n) n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                return r;
              case "Array":
                return i = a.util.objId(n), t[i] ? t[i] : (r = [], t[i] = r, n.forEach((function(n, a) {
                  r[a] = e(n, t)
                })), r);
              default:
                return n
            }
          },
          getLanguage: function(e) {
            for (; e;) {
              var t = n.exec(e.className);
              if (t) return t[1].toLowerCase();
              e = e.parentElement
            }
            return "none"
          },
          setLanguage: function(e, t) {
            e.className = e.className.replace(RegExp(n, "gi"), ""), e.classList.add("language-" + t)
          },
          currentScript: function() {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error
            } catch (r) {
              var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) || [])[1];
              if (e) {
                var n = document.getElementsByTagName("script");
                for (var t in n)
                  if (n[t].src == e) return n[t]
              }
              return null
            }
          },
          isActive: function(e, n, t) {
            for (var r = "no-" + n; e;) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement
            }
            return !!t
          }
        },
        languages: {
          plain: r,
          plaintext: r,
          text: r,
          txt: r,
          extend: function(e, n) {
            var t = a.util.clone(a.languages[e]);
            for (var r in n) t[r] = n[r];
            return t
          },
          insertBefore: function(e, n, t, r) {
            var i = (r = r || a.languages)[e],
              l = {};
            for (var o in i)
              if (i.hasOwnProperty(o)) {
                if (o == n)
                  for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                t.hasOwnProperty(o) || (l[o] = i[o])
              } var u = r[e];
            return r[e] = l, a.languages.DFS(a.languages, (function(n, t) {
              t === u && n != e && (this[n] = l)
            })), l
          },
          DFS: function e(n, t, r, i) {
            i = i || {};
            var l = a.util.objId;
            for (var o in n)
              if (n.hasOwnProperty(o)) {
                t.call(n, o, n[o], r || o);
                var s = n[o],
                  u = a.util.type(s);
                "Object" !== u || i[l(s)] ? "Array" !== u || i[l(s)] || (i[l(s)] = !0, e(s, t, o, i)) : (i[l(s)] = !0, e(s, t, null, i))
              }
          }
        },
        plugins: {},
        highlightAll: function(e, n) {
          a.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          a.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), a.hooks.run("before-all-elements-highlight", r);
          for (var i, l = 0; i = r.elements[l++];) a.highlightElement(i, !0 === n, r.callback)
        },
        highlightElement: function(n, t, r) {
          var i = a.util.getLanguage(n),
            l = a.languages[i];
          a.util.setLanguage(n, i);
          var o = n.parentElement;
          o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
          var s = {
            element: n,
            language: i,
            grammar: l,
            code: n.textContent
          };

          function u(e) {
            s.highlightedCode = e, a.hooks.run("before-insert", s), s.element.innerHTML = s.highlightedCode, a.hooks.run("after-highlight", s), a.hooks.run("complete", s), r && r.call(s.element)
          }
          if (a.hooks.run("before-sanity-check", s), (o = s.element.parentElement) && "pre" === o.nodeName.toLowerCase() && !o.hasAttribute("tabindex") && o.setAttribute("tabindex", "0"), !s.code) return a.hooks.run("complete", s), void(r && r.call(s.element));
          if (a.hooks.run("before-highlight", s), s.grammar)
            if (t && e.Worker) {
              var c = new Worker(a.filename);
              c.onmessage = function(e) {
                u(e.data)
              }, c.postMessage(JSON.stringify({
                language: s.language,
                code: s.code,
                immediateClose: !0
              }))
            } else u(a.highlight(s.code, s.grammar, s.language));
          else u(a.util.encode(s.code))
        },
        highlight: function(e, n, t) {
          var r = {
            code: e,
            grammar: n,
            language: t
          };
          if (a.hooks.run("before-tokenize", r), !r.grammar) throw new Error('The language "' + r.language + '" has no grammar.');
          return r.tokens = a.tokenize(r.code, r.grammar), a.hooks.run("after-tokenize", r), i.stringify(a.util.encode(r.tokens), r.language)
        },
        tokenize: function(e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest
          }
          var a = new s;
          return u(a, a.head, e), o(e, a, n, a.head, 0),
            function(e) {
              for (var n = [], t = e.head.next; t !== e.tail;) n.push(t.value), t = t.next;
              return n
            }(a)
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var t = a.hooks.all;
            t[e] = t[e] || [], t[e].push(n)
          },
          run: function(e, n) {
            var t = a.hooks.all[e];
            if (t && t.length)
              for (var r, i = 0; r = t[i++];) r(n)
          }
        },
        Token: i
      };

    function i(e, n, t, r) {
      this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length
    }

    function l(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        a.index += i, a[0] = a[0].slice(i)
      }
      return a
    }

    function o(e, n, t, r, s, g) {
      for (var f in t)
        if (t.hasOwnProperty(f) && t[f]) {
          var h = t[f];
          h = Array.isArray(h) ? h : [h];
          for (var d = 0; d < h.length; ++d) {
            if (g && g.cause == f + "," + d) return;
            var v = h[d],
              p = v.inside,
              m = !!v.lookbehind,
              y = !!v.greedy,
              k = v.alias;
            if (y && !v.pattern.global) {
              var x = v.pattern.toString().match(/[imsuy]*$/)[0];
              v.pattern = RegExp(v.pattern.source, x + "g")
            }
            for (var b = v.pattern || v, w = r.next, A = s; w !== n.tail && !(g && A >= g.reach); A += w.value.length, w = w.next) {
              var E = w.value;
              if (n.length > e.length) return;
              if (!(E instanceof i)) {
                var P, L = 1;
                if (y) {
                  if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                  var S = P.index,
                    O = P.index + P[0].length,
                    j = A;
                  for (j += w.value.length; S >= j;) j += (w = w.next).value.length;
                  if (A = j -= w.value.length, w.value instanceof i) continue;
                  for (var C = w; C !== n.tail && (j < O || "string" == typeof C.value); C = C.next) L++, j += C.value.length;
                  L--, E = e.slice(A, j), P.index -= A
                } else if (!(P = l(b, 0, E, m))) continue;
                S = P.index;
                var N = P[0],
                  _ = E.slice(0, S),
                  M = E.slice(S + N.length),
                  W = A + E.length;
                g && W > g.reach && (g.reach = W);
                var z = w.prev;
                if (_ && (z = u(n, z, _), A += _.length), c(n, z, L), w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N)), M && u(n, w, M), L > 1) {
                  var I = {
                    cause: f + "," + d,
                    reach: W
                  };
                  o(e, n, t, w.prev, A, I), g && I.reach > g.reach && (g.reach = I.reach)
                }
              }
            }
          }
        }
    }

    function s() {
      var e = {
          value: null,
          prev: null,
          next: null
        },
        n = {
          value: null,
          prev: e,
          next: null
        };
      e.next = n, this.head = e, this.tail = n, this.length = 0
    }

    function u(e, n, t) {
      var r = n.next,
        a = {
          value: t,
          prev: n,
          next: r
        };
      return n.next = a, r.prev = a, e.length++, a
    }

    function c(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      n.next = r, r.prev = n, e.length -= a
    }
    if (e.Prism = a, i.stringify = function e(n, t) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) {
          var r = "";
          return n.forEach((function(n) {
            r += e(n, t)
          })), r
        }
        var i = {
            type: n.type,
            content: e(n.content, t),
            tag: "span",
            classes: ["token", n.type],
            attributes: {},
            language: t
          },
          l = n.alias;
        l && (Array.isArray(l) ? Array.prototype.push.apply(i.classes, l) : i.classes.push(l)), a.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes) o += " " + s + '="' + (i.attributes[s] || "").replace(/"/g, "&quot;") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + o + ">" + i.content + "</" + i.tag + ">"
      }, !e.document) return e.addEventListener ? (a.disableWorkerMessageHandler || e.addEventListener("message", (function(n) {
      var t = JSON.parse(n.data),
        r = t.language,
        i = t.code,
        l = t.immediateClose;
      e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close()
    }), !1), a) : a;
    var g = a.util.currentScript();

    function f() {
      a.manual || a.highlightAll()
    }
    if (g && (a.filename = g.src, g.hasAttribute("data-manual") && (a.manual = !0)), !a.manual) {
      var h = document.readyState;
      "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f) : window.requestAnimationFrame ? window.requestAnimationFrame(f) : window.setTimeout(f, 16)
    }
    return a
  }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
  comment: {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: !0
  },
  prolog: {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: !0
  },
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: !0
      },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      name: /[^\s<>'"]+/
    }
  },
  cdata: {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: !0
  },
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[^\s>\/:]+:/
        }
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{
            pattern: /^=/,
            alias: "attr-equals"
          }, {
            pattern: /^(\s*)["']|["']$/,
            lookbehind: !0
          }]
        }
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: {
          namespace: /^[^\s>\/:]+:/
        }
      }
    }
  },
  entity: [{
    pattern: /&[\da-z]{1,8};/i,
    alias: "named-entity"
  }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", (function(a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
})), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
  value: function(a, e) {
    var s = {};
    s["language-" + e] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: !0,
      inside: Prism.languages[e]
    }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
    var t = {
      "included-cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: s
      }
    };
    t["language-" + e] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[e]
    };
    var n = {};
    n[a] = {
      pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, (function() {
        return a
      })), "i"),
      lookbehind: !0,
      greedy: !0,
      inside: t
    }, Prism.languages.insertBefore("markup", "cdata", n)
  }
}), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
  value: function(a, e) {
    Prism.languages.markup.tag.inside["special-attr"].push({
      pattern: RegExp("(^|[\"'\\s])(?:" + a + ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))", "i"),
      lookbehind: !0,
      inside: {
        "attr-name": /^[^\s=]+/,
        "attr-value": {
          pattern: /=[\s\S]+/,
          inside: {
            value: {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: !0,
              alias: [e, "language-" + e],
              inside: Prism.languages[e]
            },
            punctuation: [{
              pattern: /^=/,
              alias: "attr-equals"
            }, /"|'/]
          }
        }
      }
    })
  }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function(s) {
  var e = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp("@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"),
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector"
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
      }
    },
    url: {
      pattern: RegExp("\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)", "i"),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: {
          pattern: RegExp("^" + e.source + "$"),
          alias: "url"
        }
      }
    },
    selector: {
      pattern: RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" + e.source + ")*(?=\\s*\\{)"),
      lookbehind: !0
    },
    string: {
      pattern: e,
      greedy: !0
    },
    property: {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0
    },
    important: /!important\b/i,
    function: {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: !0
    },
    punctuation: /[(){};:,]/
  }, s.languages.css.atrule.inside.rest = s.languages.css;
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"))
}(Prism);
Prism.languages.clike = {
  comment: [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: !0,
    greedy: !0
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: !0,
    greedy: !0
  }],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: {
      punctuation: /[.\\]/
    }
  },
  keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [Prism.languages.clike["class-name"], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: !0
  }],
  keyword: [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: !0
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: !0
  }],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),
    lookbehind: !0
  },
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),
    lookbehind: !0,
    greedy: !0,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: !0,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  parameter: [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: !0,
    inside: Prism.languages.javascript
  }],
  constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
  hashbang: {
    pattern: /^#!.*/,
    greedy: !0,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: !0,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: !0,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      string: /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: !0,
    greedy: !0,
    alias: "property"
  }
}), Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: !0,
    alias: "property"
  }
}), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
Prism.languages.c = Prism.languages.extend("clike", {
  comment: {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  string: {
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: !0
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0
  },
  keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
}), Prism.languages.insertBefore("c", "string", {
  char: {
    pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
    greedy: !0
  }
}), Prism.languages.insertBefore("c", "string", {
  macro: {
    pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: !0,
    greedy: !0,
    alias: "property",
    inside: {
      string: [{
        pattern: /^(#\s*include\s*)<[^>]+>/,
        lookbehind: !0
      }, Prism.languages.c.string],
      char: Prism.languages.c.char,
      comment: Prism.languages.c.comment,
      "macro-name": [{
        pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
        lookbehind: !0
      }, {
        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
        lookbehind: !0,
        alias: "function"
      }],
      directive: {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: !0,
        alias: "keyword"
      },
      "directive-hash": /^#/,
      punctuation: /##|\\(?=[\r\n])/,
      expression: {
        pattern: /\S[\s\S]*/,
        inside: Prism.languages.c
      }
    }
  }
}), Prism.languages.insertBefore("c", "function", {
  constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
}), delete Prism.languages.c.boolean;
! function(e) {
  function n(e, n) {
    return e.replace(/<<(\d+)>>/g, (function(e, s) {
      return "(?:" + n[+s] + ")"
    }))
  }

  function s(e, s, a) {
    return RegExp(n(e, s), a || "")
  }

  function a(e, n) {
    for (var s = 0; s < n; s++) e = e.replace(/<<self>>/g, (function() {
      return "(?:" + e + ")"
    }));
    return e.replace(/<<self>>/g, "[^\\s\\S]")
  }
  var t = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    r = "class enum interface record struct",
    i = "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
    o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";

  function l(e) {
    return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
  }
  var d = l(r),
    p = RegExp(l(t + " " + r + " " + i + " " + o)),
    c = l(r + " " + i + " " + o),
    u = l(t + " " + r + " " + o),
    g = a("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
    b = a("\\((?:[^()]|<<self>>)*\\)", 2),
    h = "@?\\b[A-Za-z_]\\w*\\b",
    f = n("<<0>>(?:\\s*<<1>>)?", [h, g]),
    m = n("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
    k = "\\[\\s*(?:,\\s*)*\\]",
    y = n("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
    w = n("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k]),
    v = n("\\(<<0>>+(?:,<<0>>+)+\\)", [w]),
    x = n("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [v, m, k]),
    $ = {
      keyword: p,
      punctuation: /[<>()?,.:[\]]/
    },
    _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    B = '"(?:\\\\.|[^\\\\"\r\n])*"';
  e.languages.csharp = e.languages.extend("clike", {
    string: [{
      pattern: s("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
      lookbehind: !0,
      greedy: !0
    }, {
      pattern: s("(^|[^@$\\\\])<<0>>", [B]),
      lookbehind: !0,
      greedy: !0
    }],
    "class-name": [{
      pattern: s("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
      lookbehind: !0,
      inside: $
    }, {
      pattern: s("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, x]),
      lookbehind: !0,
      inside: $
    }, {
      pattern: s("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
      lookbehind: !0
    }, {
      pattern: s("(\\b<<0>>\\s+)<<1>>", [d, f]),
      lookbehind: !0,
      inside: $
    }, {
      pattern: s("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
      lookbehind: !0,
      inside: $
    }, {
      pattern: s("(\\bwhere\\s+)<<0>>", [h]),
      lookbehind: !0
    }, {
      pattern: s("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
      lookbehind: !0,
      inside: $
    }, {
      pattern: s("\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [x, u, h]),
      inside: $
    }],
    keyword: p,
    number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/
  }), e.languages.insertBefore("csharp", "number", {
    range: {
      pattern: /\.\./,
      alias: "operator"
    }
  }), e.languages.insertBefore("csharp", "punctuation", {
    "named-parameter": {
      pattern: s("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
      lookbehind: !0,
      alias: "punctuation"
    }
  }), e.languages.insertBefore("csharp", "class-name", {
    namespace: {
      pattern: s("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
      lookbehind: !0,
      inside: {
        punctuation: /\./
      }
    },
    "type-expression": {
      pattern: s("(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))", [b]),
      lookbehind: !0,
      alias: "class-name",
      inside: $
    },
    "return-type": {
      pattern: s("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [x, m]),
      inside: $,
      alias: "class-name"
    },
    "constructor-invocation": {
      pattern: s("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [x]),
      lookbehind: !0,
      inside: $,
      alias: "class-name"
    },
    "generic-method": {
      pattern: s("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
      inside: {
        function: s("^<<0>>", [h]),
        generic: {
          pattern: RegExp(g),
          alias: "class-name",
          inside: $
        }
      }
    },
    "type-list": {
      pattern: s("\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, x, p.source, b, "\\bnew\\s*\\(\\s*\\)"]),
      lookbehind: !0,
      inside: {
        "record-arguments": {
          pattern: s("(^(?!new\\s*\\()<<0>>\\s*)<<1>>", [f, b]),
          lookbehind: !0,
          greedy: !0,
          inside: e.languages.csharp
        },
        keyword: p,
        "class-name": {
          pattern: RegExp(x),
          greedy: !0,
          inside: $
        },
        punctuation: /[,()]/
      }
    },
    preprocessor: {
      pattern: /(^[\t ]*)#.*/m,
      lookbehind: !0,
      alias: "property",
      inside: {
        directive: {
          pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
          lookbehind: !0,
          alias: "keyword"
        }
      }
    }
  });
  var E = B + "|" + _,
    R = n("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [E]),
    z = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2),
    S = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
    j = n("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, z]);
  e.languages.insertBefore("csharp", "class-name", {
    attribute: {
      pattern: s("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [S, j]),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: {
          pattern: s("^<<0>>(?=\\s*:)", [S]),
          alias: "keyword"
        },
        "attribute-arguments": {
          pattern: s("\\(<<0>>*\\)", [z]),
          inside: e.languages.csharp
        },
        "class-name": {
          pattern: RegExp(m),
          inside: {
            punctuation: /\./
          }
        },
        punctuation: /[:,]/
      }
    }
  });
  var A = ":[^}\r\n]+",
    F = a(n("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [R]), 2),
    P = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [F, A]),
    U = a(n("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [E]), 2),
    Z = n("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [U, A]);

  function q(n, a) {
    return {
      interpolation: {
        pattern: s("((?:^|[^{])(?:\\{\\{)*)<<0>>", [n]),
        lookbehind: !0,
        inside: {
          "format-string": {
            pattern: s("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [a, A]),
            lookbehind: !0,
            inside: {
              punctuation: /^:/
            }
          },
          punctuation: /^\{|\}$/,
          expression: {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: e.languages.csharp
          }
        }
      },
      string: /[\s\S]+/
    }
  }
  e.languages.insertBefore("csharp", "string", {
    "interpolation-string": [{
      pattern: s('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [P]),
      lookbehind: !0,
      greedy: !0,
      inside: q(P, F)
    }, {
      pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]),
      lookbehind: !0,
      greedy: !0,
      inside: q(Z, U)
    }],
    char: {
      pattern: RegExp(_),
      greedy: !0
    }
  }), e.languages.dotnet = e.languages.cs = e.languages.csharp
}(Prism);
! function(e) {
  var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = "\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b".replace(/<keyword>/g, (function() {
      return t.source
    }));
  e.languages.cpp = e.languages.extend("c", {
    "class-name": [{
      pattern: RegExp("(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, (function() {
        return t.source
      }))),
      lookbehind: !0
    }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
    keyword: t,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0
    },
    operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/
  }), e.languages.insertBefore("cpp", "string", {
    module: {
      pattern: RegExp('(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' + "<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>".replace(/<mod-name>/g, (function() {
        return n
      })) + ")"),
      lookbehind: !0,
      greedy: !0,
      inside: {
        string: /^[<"][\s\S]+/,
        operator: /:/,
        punctuation: /\./
      }
    },
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: !0
    }
  }), e.languages.insertBefore("cpp", "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        function: /^\w+/,
        generic: {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: e.languages.cpp
        }
      }
    }
  }), e.languages.insertBefore("cpp", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  }), e.languages.insertBefore("cpp", "class-name", {
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: e.languages.extend("cpp", {})
    }
  }), e.languages.insertBefore("inside", "double-colon", {
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, e.languages.cpp["base-clause"])
}(Prism);
! function(e) {
  e.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m]
  };
  var n = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!"
  };
  Object.keys(n).forEach((function(a) {
    var i = n[a],
      r = [];
    /^\w+$/.test(a) || r.push(/\w+/.exec(a)[0]), "diff" === a && r.push("bold"), e.languages.diff[a] = {
      pattern: RegExp("^(?:[" + i + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
      alias: r,
      inside: {
        line: {
          pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
          lookbehind: !0
        },
        prefix: {
          pattern: /[\s\S]/,
          alias: /\w+/.exec(a)[0]
        }
      }
    }
  })), Object.defineProperty(e.languages.diff, "PREFIXES", {
    value: n
  })
}(Prism);
! function(n) {
  function e(n) {
    return n = n.replace(/<inner>/g, (function() {
      return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))"
    })), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n + ")")
  }
  var t = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
    a = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(/__/g, (function() {
      return t
    })),
    i = "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
  n.languages.markdown = n.languages.extend("markup", {}), n.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: n.languages.yaml
        }
      }
    },
    blockquote: {
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + a + i + "(?:" + a + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + a + i + ")(?:" + a + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(t),
              inside: n.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + a + ")" + i + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + a + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(t),
              alias: "important",
              inside: n.languages.markdown
            },
            punctuation: /\|/
          }
        }
      }
    },
    code: [{
      pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
      lookbehind: !0,
      alias: "keyword"
    }, {
      pattern: /^```[\s\S]*?^```$/m,
      greedy: !0,
      inside: {
        "code-block": {
          pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
          lookbehind: !0
        },
        "code-language": {
          pattern: /^(```).+/,
          lookbehind: !0
        },
        punctuation: /```/
      }
    }],
    title: [{
      pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
      alias: "important",
      inside: {
        punctuation: /==+$|--+$/
      }
    }, {
      pattern: /(^\s*)#.+/m,
      lookbehind: !0,
      alias: "important",
      inside: {
        punctuation: /^#+|#+$/
      }
    }],
    hr: {
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    list: {
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    "url-reference": {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: !0
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/
      },
      alias: "url"
    },
    bold: {
      pattern: e("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: !0,
          inside: {}
        },
        punctuation: /\*\*|__/
      }
    },
    italic: {
      pattern: e("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: !0,
          inside: {}
        },
        punctuation: /[*_]/
      }
    },
    strike: {
      pattern: e("(~~?)(?:(?!~)<inner>)+\\2"),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: !0,
          inside: {}
        },
        punctuation: /~~?/
      }
    },
    "code-snippet": {
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: !0,
      greedy: !0,
      alias: ["code", "keyword"]
    },
    url: {
      pattern: e('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),
      lookbehind: !0,
      greedy: !0,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: !0,
          inside: {}
        },
        variable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: !0
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: !0
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: !0
        }
      }
    }
  }), ["url", "bold", "italic", "strike"].forEach((function(e) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach((function(t) {
      e !== t && (n.languages.markdown[e].inside.content.inside[t] = n.languages.markdown[t])
    }))
  })), n.hooks.add("after-tokenize", (function(n) {
    "markdown" !== n.language && "md" !== n.language || function n(e) {
      if (e && "string" != typeof e)
        for (var t = 0, a = e.length; t < a; t++) {
          var i = e[t];
          if ("code" === i.type) {
            var r = i.content[1],
              o = i.content[3];
            if (r && o && "code-language" === r.type && "code-block" === o.type && "string" == typeof r.content) {
              var l = r.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"),
                s = "language-" + (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
              o.alias ? "string" == typeof o.alias ? o.alias = [o.alias, s] : o.alias.push(s) : o.alias = [s]
            }
          } else n(i.content)
        }
    }(n.tokens)
  })), n.hooks.add("wrap", (function(e) {
    if ("code-block" === e.type) {
      for (var t = "", a = 0, i = e.classes.length; a < i; a++) {
        var s = e.classes[a],
          d = /language-(.+)/.exec(s);
        if (d) {
          t = d[1];
          break
        }
      }
      var p = n.languages[t];
      if (p) e.content = n.highlight(e.content.replace(r, "").replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, (function(n, e) {
        var t;
        return "#" === (e = e.toLowerCase())[0] ? (t = "x" === e[1] ? parseInt(e.slice(2), 16) : Number(e.slice(1)), l(t)) : o[e] || n
      })), p, t);
      else if (t && "none" !== t && n.plugins.autoloader) {
        var u = "md-" + (new Date).valueOf() + "-" + Math.floor(1e16 * Math.random());
        e.attributes.id = u, n.plugins.autoloader.loadLanguages(t, (function() {
          var e = document.getElementById(u);
          e && (e.innerHTML = n.highlight(e.textContent, n.languages[t], t))
        }))
      }
    }
  }));
  var r = RegExp(n.languages.markup.tag.pattern.source, "gi"),
    o = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"'
    },
    l = String.fromCodePoint || String.fromCharCode;
  n.languages.md = n.languages.markdown
}(Prism);
! function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e = [],
      t = {},
      n = function() {};
    Prism.plugins.toolbar = {};
    var a = Prism.plugins.toolbar.registerButton = function(n, a) {
        var r;
        r = "function" == typeof a ? a : function(e) {
          var t;
          return "function" == typeof a.onClick ? ((t = document.createElement("button")).type = "button", t.addEventListener("click", (function() {
            a.onClick.call(this, e)
          }))) : "string" == typeof a.url ? (t = document.createElement("a")).href = a.url : t = document.createElement("span"), a.className && t.classList.add(a.className), t.textContent = a.text, t
        }, n in t ? console.warn('There is a button with the key "' + n + '" registered already.') : e.push(t[n] = r)
      },
      r = Prism.plugins.toolbar.hook = function(a) {
        var r = a.element.parentNode;
        if (r && /pre/i.test(r.nodeName) && !r.parentNode.classList.contains("code-toolbar")) {
          var o = document.createElement("div");
          o.classList.add("code-toolbar"), r.parentNode.insertBefore(o, r), o.appendChild(r);
          var i = document.createElement("div");
          i.classList.add("toolbar");
          var l = e,
            d = function(e) {
              for (; e;) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t) return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement
              }
            }(a.element);
          d && (l = d.map((function(e) {
            return t[e] || n
          }))), l.forEach((function(e) {
            var t = e(a);
            if (t) {
              var n = document.createElement("div");
              n.classList.add("toolbar-item"), n.appendChild(t), i.appendChild(n)
            }
          })), o.appendChild(i)
        }
      };
    a("label", (function(e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n, a, r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r)
        } catch (e) {}
        return a ? n = a.content : (t.hasAttribute("data-url") ? (n = document.createElement("a")).href = t.getAttribute("data-url") : n = document.createElement("span"), n.textContent = r), n
      }
    })), Prism.hooks.add("complete", r)
  }
}();
! function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document)
    if (Prism.plugins.toolbar) {
      var e = {
        none: "Plain text",
        plain: "Plain text",
        plaintext: "Plain text",
        text: "Plain text",
        txt: "Plain text",
        html: "HTML",
        xml: "XML",
        svg: "SVG",
        mathml: "MathML",
        ssml: "SSML",
        rss: "RSS",
        css: "CSS",
        clike: "C-like",
        js: "JavaScript",
        abap: "ABAP",
        abnf: "ABNF",
        al: "AL",
        antlr4: "ANTLR4",
        g4: "ANTLR4",
        apacheconf: "Apache Configuration",
        apl: "APL",
        aql: "AQL",
        ino: "Arduino",
        arff: "ARFF",
        armasm: "ARM Assembly",
        "arm-asm": "ARM Assembly",
        art: "Arturo",
        asciidoc: "AsciiDoc",
        adoc: "AsciiDoc",
        aspnet: "ASP.NET (C#)",
        asm6502: "6502 Assembly",
        asmatmel: "Atmel AVR Assembly",
        autohotkey: "AutoHotkey",
        autoit: "AutoIt",
        avisynth: "AviSynth",
        avs: "AviSynth",
        "avro-idl": "Avro IDL",
        avdl: "Avro IDL",
        awk: "AWK",
        gawk: "GAWK",
        sh: "Shell",
        basic: "BASIC",
        bbcode: "BBcode",
        bbj: "BBj",
        bnf: "BNF",
        rbnf: "RBNF",
        bqn: "BQN",
        bsl: "BSL (1C:Enterprise)",
        oscript: "OneScript",
        csharp: "C#",
        cs: "C#",
        dotnet: "C#",
        cpp: "C++",
        cfscript: "CFScript",
        cfc: "CFScript",
        cil: "CIL",
        cilkc: "Cilk/C",
        "cilk-c": "Cilk/C",
        cilkcpp: "Cilk/C++",
        "cilk-cpp": "Cilk/C++",
        cilk: "Cilk/C++",
        cmake: "CMake",
        cobol: "COBOL",
        coffee: "CoffeeScript",
        conc: "Concurnas",
        csp: "Content-Security-Policy",
        "css-extras": "CSS Extras",
        csv: "CSV",
        cue: "CUE",
        dataweave: "DataWeave",
        dax: "DAX",
        django: "Django/Jinja2",
        jinja2: "Django/Jinja2",
        "dns-zone-file": "DNS zone file",
        "dns-zone": "DNS zone file",
        dockerfile: "Docker",
        dot: "DOT (Graphviz)",
        gv: "DOT (Graphviz)",
        ebnf: "EBNF",
        editorconfig: "EditorConfig",
        ejs: "EJS",
        etlua: "Embedded Lua templating",
        erb: "ERB",
        "excel-formula": "Excel Formula",
        xlsx: "Excel Formula",
        xls: "Excel Formula",
        fsharp: "F#",
        "firestore-security-rules": "Firestore security rules",
        ftl: "FreeMarker Template Language",
        gml: "GameMaker Language",
        gamemakerlanguage: "GameMaker Language",
        gap: "GAP (CAS)",
        gcode: "G-code",
        gdscript: "GDScript",
        gedcom: "GEDCOM",
        gettext: "gettext",
        po: "gettext",
        glsl: "GLSL",
        gn: "GN",
        gni: "GN",
        "linker-script": "GNU Linker Script",
        ld: "GNU Linker Script",
        "go-module": "Go module",
        "go-mod": "Go module",
        graphql: "GraphQL",
        hbs: "Handlebars",
        hs: "Haskell",
        hcl: "HCL",
        hlsl: "HLSL",
        http: "HTTP",
        hpkp: "HTTP Public-Key-Pins",
        hsts: "HTTP Strict-Transport-Security",
        ichigojam: "IchigoJam",
        "icu-message-format": "ICU Message Format",
        idr: "Idris",
        ignore: ".ignore",
        gitignore: ".gitignore",
        hgignore: ".hgignore",
        npmignore: ".npmignore",
        inform7: "Inform 7",
        javadoc: "JavaDoc",
        javadoclike: "JavaDoc-like",
        javastacktrace: "Java stack trace",
        jq: "JQ",
        jsdoc: "JSDoc",
        "js-extras": "JS Extras",
        json: "JSON",
        webmanifest: "Web App Manifest",
        json5: "JSON5",
        jsonp: "JSONP",
        jsstacktrace: "JS stack trace",
        "js-templates": "JS Templates",
        keepalived: "Keepalived Configure",
        kts: "Kotlin Script",
        kt: "Kotlin",
        kumir: "KuMir (КуМир)",
        kum: "KuMir (КуМир)",
        latex: "LaTeX",
        tex: "TeX",
        context: "ConTeXt",
        lilypond: "LilyPond",
        ly: "LilyPond",
        emacs: "Lisp",
        elisp: "Lisp",
        "emacs-lisp": "Lisp",
        llvm: "LLVM IR",
        log: "Log file",
        lolcode: "LOLCODE",
        magma: "Magma (CAS)",
        md: "Markdown",
        "markup-templating": "Markup templating",
        matlab: "MATLAB",
        maxscript: "MAXScript",
        mel: "MEL",
        metafont: "METAFONT",
        mongodb: "MongoDB",
        moon: "MoonScript",
        n1ql: "N1QL",
        n4js: "N4JS",
        n4jsd: "N4JS",
        "nand2tetris-hdl": "Nand To Tetris HDL",
        naniscript: "Naninovel Script",
        nani: "Naninovel Script",
        nasm: "NASM",
        neon: "NEON",
        nginx: "nginx",
        nsis: "NSIS",
        objectivec: "Objective-C",
        objc: "Objective-C",
        ocaml: "OCaml",
        opencl: "OpenCL",
        openqasm: "OpenQasm",
        qasm: "OpenQasm",
        parigp: "PARI/GP",
        objectpascal: "Object Pascal",
        psl: "PATROL Scripting Language",
        pcaxis: "PC-Axis",
        px: "PC-Axis",
        peoplecode: "PeopleCode",
        pcode: "PeopleCode",
        php: "PHP",
        phpdoc: "PHPDoc",
        "php-extras": "PHP Extras",
        "plant-uml": "PlantUML",
        plantuml: "PlantUML",
        plsql: "PL/SQL",
        powerquery: "PowerQuery",
        pq: "PowerQuery",
        mscript: "PowerQuery",
        powershell: "PowerShell",
        promql: "PromQL",
        properties: ".properties",
        protobuf: "Protocol Buffers",
        purebasic: "PureBasic",
        pbfasm: "PureBasic",
        purs: "PureScript",
        py: "Python",
        qsharp: "Q#",
        qs: "Q#",
        q: "Q (kdb+ database)",
        qml: "QML",
        rkt: "Racket",
        cshtml: "Razor C#",
        razor: "Razor C#",
        jsx: "React JSX",
        tsx: "React TSX",
        renpy: "Ren'py",
        rpy: "Ren'py",
        res: "ReScript",
        rest: "reST (reStructuredText)",
        robotframework: "Robot Framework",
        robot: "Robot Framework",
        rb: "Ruby",
        sas: "SAS",
        sass: "Sass (Sass)",
        scss: "Sass (SCSS)",
        "shell-session": "Shell session",
        "sh-session": "Shell session",
        shellsession: "Shell session",
        sml: "SML",
        smlnj: "SML/NJ",
        solidity: "Solidity (Ethereum)",
        sol: "Solidity (Ethereum)",
        "solution-file": "Solution file",
        sln: "Solution file",
        soy: "Soy (Closure Template)",
        sparql: "SPARQL",
        rq: "SPARQL",
        "splunk-spl": "Splunk SPL",
        sqf: "SQF: Status Quo Function (Arma 3)",
        sql: "SQL",
        stata: "Stata Ado",
        iecst: "Structured Text (IEC 61131-3)",
        supercollider: "SuperCollider",
        sclang: "SuperCollider",
        systemd: "Systemd configuration file",
        "t4-templating": "T4 templating",
        "t4-cs": "T4 Text Templates (C#)",
        t4: "T4 Text Templates (C#)",
        "t4-vb": "T4 Text Templates (VB)",
        tap: "TAP",
        tt2: "Template Toolkit 2",
        toml: "TOML",
        trickle: "trickle",
        troy: "troy",
        trig: "TriG",
        ts: "TypeScript",
        tsconfig: "TSConfig",
        uscript: "UnrealScript",
        uc: "UnrealScript",
        uorazor: "UO Razor Script",
        uri: "URI",
        url: "URL",
        vbnet: "VB.Net",
        vhdl: "VHDL",
        vim: "vim",
        "visual-basic": "Visual Basic",
        vba: "VBA",
        vb: "Visual Basic",
        wasm: "WebAssembly",
        "web-idl": "Web IDL",
        webidl: "Web IDL",
        wgsl: "WGSL",
        wiki: "Wiki markup",
        wolfram: "Wolfram language",
        nb: "Mathematica Notebook",
        wl: "Wolfram language",
        xeoracube: "XeoraCube",
        "xml-doc": "XML doc (.net)",
        xojo: "Xojo (REALbasic)",
        xquery: "XQuery",
        yaml: "YAML",
        yml: "YAML",
        yang: "YANG"
      };
      Prism.plugins.toolbar.registerButton("show-language", (function(a) {
        var t = a.element.parentNode;
        if (t && /pre/i.test(t.nodeName)) {
          var o, i = t.getAttribute("data-language") || e[a.language] || ((o = a.language) ? (o.substring(0, 1).toUpperCase() + o.substring(1)).replace(/s(?=cript)/, "S") : o);
          if (i) {
            var s = document.createElement("span");
            return s.textContent = i, s
          }
        }
      }))
    } else console.warn("Show Languages plugin loaded before Toolbar plugin.")
}();
! function() {
  if ("undefined" != typeof Prism) {
    var e = /^diff-([\w-]+)/i,
      i = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      a = RegExp("(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(/__/g, (function() {
        return i.source
      })), "gi"),
      s = !1;
    Prism.hooks.add("before-sanity-check", (function(i) {
      var a = i.language;
      e.test(a) && !i.grammar && (i.grammar = Prism.languages[a] = Prism.languages.diff)
    })), Prism.hooks.add("before-tokenize", (function(i) {
      s || Prism.languages.diff || Prism.plugins.autoloader || (s = !0, console.warn("Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin."));
      var a = i.language;
      e.test(a) && !Prism.languages[a] && (Prism.languages[a] = Prism.languages.diff)
    })), Prism.hooks.add("wrap", (function(s) {
      var r, n;
      if ("diff" !== s.language) {
        var g = e.exec(s.language);
        if (!g) return;
        r = g[1], n = Prism.languages[r]
      }
      var f = Prism.languages.diff && Prism.languages.diff.PREFIXES;
      if (f && s.type in f) {
        var u, l = s.content.replace(i, "").replace(/&lt;/g, "<").replace(/&amp;/g, "&"),
          t = l.replace(/(^|[\r\n])./g, "$1");
        u = n ? Prism.highlight(t, n, r) : Prism.util.encode(t);
        var o, m = new Prism.Token("prefix", f[s.type], [/\w+/.exec(s.type)[0]]),
          d = Prism.Token.stringify(m, s.language),
          c = [];
        for (a.lastIndex = 0; o = a.exec(u);) c.push(d + o[0]);
        /(?:^|[\r\n]).$/.test(l) && c.push(d), s.content = c.join(""), n && s.classes.push("language-" + r)
      }
    }))
  }
}();