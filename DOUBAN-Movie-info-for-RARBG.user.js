// ==UserScript==
// @name         DOUBAN Movie info for RARBG
// @namespace    http://rarbg.to/
// @version      0.5.0
// @description  Adds douban movie info to RARBG.to
// @author       tofuliang
// @match        https://rarbg.to/*
// @match        http://rarbg.to/*
// @match        https://rarbg.is/*
// @match        http://rarbg.is/*
// @match        https://rarbgprx.org/*
// @match        http://rarbgprx.org/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @connect      api.douban.com
// ==/UserScript==

function isEmpty(s) {
    return !s || s === 'N/A';
}
var emptyStar = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5Ljk0IDQ5Ljk0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OS45NCA0OS45NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik00OC44NTYsMjIuNzMxYzAuOTgzLTAuOTU4LDEuMzMtMi4zNjQsMC45MDYtMy42NzFjLTAuNDI1LTEuMzA3LTEuNTMyLTIuMjQtMi44OTItMi40MzhsLTEyLjA5Mi0xLjc1NyAgYy0wLjUxNS0wLjA3NS0wLjk2LTAuMzk4LTEuMTktMC44NjVMMjguMTgyLDMuMDQzYy0wLjYwNy0xLjIzMS0xLjgzOS0xLjk5Ni0zLjIxMi0xLjk5NmMtMS4zNzIsMC0yLjYwNCwwLjc2NS0zLjIxMSwxLjk5NiAgTDE2LjM1MiwxNGMtMC4yMywwLjQ2Ny0wLjY3NiwwLjc5LTEuMTkxLDAuODY1TDMuMDY5LDE2LjYyM0MxLjcxLDE2LjgyLDAuNjAzLDE3Ljc1MywwLjE3OCwxOS4wNiAgYy0wLjQyNCwxLjMwNy0wLjA3NywyLjcxMywwLjkwNiwzLjY3MWw4Ljc0OSw4LjUyOGMwLjM3MywwLjM2NCwwLjU0NCwwLjg4OCwwLjQ1NiwxLjRMOC4yMjQsNDQuNzAyICBjLTAuMjMyLDEuMzUzLDAuMzEzLDIuNjk0LDEuNDI0LDMuNTAyYzEuMTEsMC44MDksMi41NTUsMC45MTQsMy43NzIsMC4yNzNsMTAuODE0LTUuNjg2YzAuNDYxLTAuMjQyLDEuMDExLTAuMjQyLDEuNDcyLDAgIGwxMC44MTUsNS42ODZjMC41MjgsMC4yNzgsMS4xLDAuNDE1LDEuNjY5LDAuNDE1YzAuNzM5LDAsMS40NzUtMC4yMzEsMi4xMDMtMC42ODhjMS4xMTEtMC44MDgsMS42NTYtMi4xNDksMS40MjQtMy41MDIgIEwzOS42NTEsMzIuNjZjLTAuMDg4LTAuNTEzLDAuMDgzLTEuMDM2LDAuNDU2LTEuNEw0OC44NTYsMjIuNzMxeiBNMzcuNjgxLDMyLjk5OGwyLjA2NSwxMi4wNDJjMC4xMDQsMC42MDYtMC4xMzEsMS4xODUtMC42MjksMS41NDcgIGMtMC40OTksMC4zNjEtMS4xMiwwLjQwNS0xLjY2NSwwLjEyMWwtMTAuODE1LTUuNjg3Yy0wLjUyMS0wLjI3My0xLjA5NS0wLjQxMS0xLjY2Ny0wLjQxMXMtMS4xNDUsMC4xMzgtMS42NjcsMC40MTJsLTEwLjgxMyw1LjY4NiAgYy0wLjU0NywwLjI4NC0xLjE2OCwwLjI0LTEuNjY2LTAuMTIxYy0wLjQ5OC0wLjM2Mi0wLjczMi0wLjk0LTAuNjI5LTEuNTQ3bDIuMDY1LTEyLjA0MmMwLjE5OS0xLjE2Mi0wLjE4Ni0yLjM0OC0xLjAzLTMuMTcgIEwyLjQ4LDIxLjI5OWMtMC40NDEtMC40My0wLjU5MS0xLjAzNi0wLjQtMS42MjFjMC4xOS0wLjU4NiwwLjY2Ny0wLjk4OCwxLjI3Ni0xLjA3N2wxMi4wOTEtMS43NTcgIGMxLjE2Ny0wLjE2OSwyLjE3Ni0wLjkwMSwyLjY5Ny0xLjk1OWw1LjQwNy0xMC45NTdjMC4yNzItMC41NTIsMC44MDMtMC44ODEsMS40MTgtMC44ODFjMC42MTYsMCwxLjE0NiwwLjMyOSwxLjQxOSwwLjg4MSAgbDUuNDA3LDEwLjk1N2MwLjUyMSwxLjA1OCwxLjUyOSwxLjc5LDIuNjk2LDEuOTU5bDEyLjA5MiwxLjc1N2MwLjYwOSwwLjA4OSwxLjA4NiwwLjQ5MSwxLjI3NiwxLjA3NyAgYzAuMTksMC41ODUsMC4wNDEsMS4xOTEtMC40LDEuNjIxbC04Ljc0OSw4LjUyOEMzNy44NjYsMzAuNjUsMzcuNDgxLDMxLjgzNSwzNy42ODEsMzIuOTk4eiIgZmlsbD0iI0ZGREE0NCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K';
var solidStar = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyLjAwMiA1MTIuMDAyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIuMDAyIDUxMi4wMDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjM2LjkzODIiIHkxPSI0NTguNDI4NCIgeDI9IjIzNi45MzgyIiB5Mj0iLTcxLjE4MTYiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMS4wNjY3IDAgMCAtMS4wNjY3IDMuMjY2NiA1NTcuNTM1MikiPg0KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkNGOTUiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjQyNyIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQzk1NCIvPg0KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkMyMDAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzFfKTsiIGQ9Ik0yNzQuODQsMjMuMjEybDY3LjcyMiwxMzcuMjE4bDE1MS40MjksMjIuMDA0YzE3LjIzMiwyLjUwMywyNC4xMTIsMjMuNjgsMTEuNjQ0LDM1LjgzNQ0KCUwzOTYuMDU4LDMyNS4wNzdsMjUuODY3LDE1MC44MTdjMi45NDQsMTcuMTYyLTE1LjA3LDMwLjI1LTMwLjQ4MiwyMi4xNDdMMjU2LDQyNi44MzVsLTEzNS40NDIsNzEuMjA2DQoJYy0xNS40MTIsOC4xMDItMzMuNDI2LTQuOTg1LTMwLjQ4Mi0yMi4xNDdsMjUuODY3LTE1MC44MTdMNi4zNjcsMjE4LjI2OGMtMTIuNDY5LTEyLjE1NS01LjU4OC0zMy4zMywxMS42NDQtMzUuODM1bDE1MS40MjktMjIuMDA0DQoJbDY3LjcyMS0xMzcuMjE3QzI0NC44NjgsNy41OTcsMjY3LjEzMyw3LjU5NywyNzQuODQsMjMuMjEyeiIvPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzNjEuMzM4IiB5MT0iMzkwLjEzMTQiIHgyPSIyMDEuMjM4IiB5Mj0iMzkwLjEzMTQiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMS4wNjY3IDAgMCAtMS4wNjY3IDMuMjY2NiA1NTcuNTM1MikiPg0KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkMyMDA7c3RvcC1vcGFjaXR5OjAiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjIwMyIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQkIwMDtzdG9wLW9wYWNpdHk6MC4yMDMiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjQ5OSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQTcwMDtzdG9wLW9wYWNpdHk6MC40OTkiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjg1MiIgc3R5bGU9InN0b3AtY29sb3I6I0ZGODgwMDtzdG9wLW9wYWNpdHk6MC44NTIiLz4NCgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY3ODAwIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF8yXyk7IiBkPSJNMzQyLjU2LDE2MC40M0wyNzQuODQsMjMuMjEyYy0zLjg1My03LjgwNy0xMS4zNDYtMTEuNzExLTE4LjgzOS0xMS43MTF2MjU5Ljc4OQ0KCUwzNDIuNTYsMTYwLjQzeiIvPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8zXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzODguNjg3NCIgeTE9IjE0NC44MzgzIiB4Mj0iMzQ2LjI4NzQiIHkyPSIzNTMuNjM4MyIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxLjA2NjcgMCAwIC0xLjA2NjcgMy4yNjY2IDU1Ny41MzUyKSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQzIwMDtzdG9wLW9wYWNpdHk6MCIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMjAzIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZCQjAwO3N0b3Atb3BhY2l0eTowLjIwMyIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNDk5IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZBNzAwO3N0b3Atb3BhY2l0eTowLjQ5OSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuODUyIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY4ODAwO3N0b3Atb3BhY2l0eTowLjg1MiIvPg0KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjc4MDAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzNfKTsiIGQ9Ik0zOTYuMDU4LDMyNS4wNzdsMTA5LjU3NS0xMDYuODFjNi4xNTEtNS45OTYsNy41ODYtMTQuMTg1LDUuMzk5LTIxLjI0N0wyNTYsMjcxLjI4OQ0KCUwzOTYuMDU4LDMyNS4wNzd6Ii8+DQo8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE4My4wOTc3IiB5MT0iMzUuMTA4NyIgeDI9IjM0OS4xNTc3IiB5Mj0iMjAxLjE2ODciIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMS4wNjY3IDAgMCAtMS4wNjY3IDMuMjY2NiA1NTcuNTM1MikiPg0KCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkMyMDA7c3RvcC1vcGFjaXR5OjAiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjIwMyIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQkIwMDtzdG9wLW9wYWNpdHk6MC4yMDMiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjQ5OSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQTcwMDtzdG9wLW9wYWNpdHk6MC40OTkiLz4NCgk8c3RvcCAgb2Zmc2V0PSIwLjg1MiIgc3R5bGU9InN0b3AtY29sb3I6I0ZGODgwMDtzdG9wLW9wYWNpdHk6MC44NTIiLz4NCgk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY3ODAwIi8+DQo8L2xpbmVhckdyYWRpZW50Pg0KPHBhdGggc3R5bGU9ImZpbGw6dXJsKCNTVkdJRF80Xyk7IiBkPSJNNDEzLjYzLDQ5Ni4zOTNMMjU2LDI3MS4yODl2MTU1LjU0NmwxMzUuNDQyLDcxLjIwNg0KCUMzOTkuMTc2LDUwMi4xMDcsNDA3LjU2Myw1MDAuODM1LDQxMy42Myw0OTYuMzkzeiIvPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF81XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2NC42Nzc3IiB5MT0iMjQ1LjEwOCIgeDI9IjE4Ny4wNzc3IiB5Mj0iMTQyLjcwOCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxLjA2NjcgMCAwIC0xLjA2NjcgMy4yNjY2IDU1Ny41MzUyKSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQzIwMDtzdG9wLW9wYWNpdHk6MCIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMjAzIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZCQjAwO3N0b3Atb3BhY2l0eTowLjIwMyIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNDk5IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZBNzAwO3N0b3Atb3BhY2l0eTowLjQ5OSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuODUyIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY4ODAwO3N0b3Atb3BhY2l0eTowLjg1MiIvPg0KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjc4MDAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzVfKTsiIGQ9Ik0yNTYsMjcxLjI4OWwtMTQwLjA1OCw1My43ODhMOTAuMDc2LDQ3NS44OTRjLTEuNDY3LDguNTUsMi4yNzEsMTYuMDg3LDguMjk0LDIwLjQ5OQ0KCUwyNTYsMjcxLjI4OXoiLz4NCjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNl8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTU2LjQzMzQiIHkxPSI0MTQuMDIiIHgyPSIxMDYuODMzNCIgeTI9IjI3My4yMiIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxLjA2NjcgMCAwIC0xLjA2NjcgMy4yNjY2IDU1Ny41MzUyKSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQzIwMDtzdG9wLW9wYWNpdHk6MCIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMjAzIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZCQjAwO3N0b3Atb3BhY2l0eTowLjIwMyIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNDk5IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZBNzAwO3N0b3Atb3BhY2l0eTowLjQ5OSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuODUyIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY4ODAwO3N0b3Atb3BhY2l0eTowLjg1MiIvPg0KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjc4MDAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzZfKTsiIGQ9Ik0wLjk2OCwxOTcuMDIxTDI1NiwyNzEuMjg5bC04Ni41Ni0xMTAuODZMMTguMDExLDE4Mi40MzQNCglDOS4yOCwxODMuNzAyLDMuMjE0LDE4OS43NjcsMC45NjgsMTk3LjAyMUwwLjk2OCwxOTcuMDIxeiIvPg0KPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF83XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzNDMuMTM5OSIgeTE9IjM5OS4zMTY0IiB4Mj0iLTIxLjI2MDEiIHkyPSIyNDQuMTE2NCIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxLjA2NjcgMCAwIC0xLjA2NjcgMy4yNjY2IDU1Ny41MzUyKSI+DQoJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6I0ZGQzIwMDtzdG9wLW9wYWNpdHk6MCIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuMjAzIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZCQjAwO3N0b3Atb3BhY2l0eTowLjIwMyIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuNDk5IiBzdHlsZT0ic3RvcC1jb2xvcjojRkZBNzAwO3N0b3Atb3BhY2l0eTowLjQ5OSIvPg0KCTxzdG9wICBvZmZzZXQ9IjAuODUyIiBzdHlsZT0ic3RvcC1jb2xvcjojRkY4ODAwO3N0b3Atb3BhY2l0eTowLjg1MiIvPg0KCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRjc4MDAiLz4NCjwvbGluZWFyR3JhZGllbnQ+DQo8cGF0aCBzdHlsZT0iZmlsbDp1cmwoI1NWR0lEXzdfKTsiIGQ9Ik0xMTUuOTQzLDMyNS4wNzdMNi4zNjcsMjE4LjI2OGMtNi4xNTEtNS45OTYtNy41ODYtMTQuMTg1LTUuMzk5LTIxLjI0N0wyNTYsMjcxLjI4OQ0KCUwxMTUuOTQzLDMyNS4wNzd6Ii8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==';
$('body').on('mouseenter', 'a[data-imdbId]', function() {
    var imdbId = $(this).attr('data-imdbId');
    var aTag = this;
    overlib('<span>数据加载中...</span>');
    function showDouBanInfo(data,aTag) {
        var html = '<style type="text/css"> .db-container {width: 600px; } .db-title p {font-size: x-large; margin: 5px 0px; text-align: center; font-weight: bolder; } .db-left {width: 150px; float: left; text-align: center; } .db-poster {margin: 10px 10px; text-align: center; } .db-score {margin: 0 10px; } .db-score p {font-size: large; } .db-info {width: 450px; float: right; } </style>';
        html += '<div class="db-container">';
        html += '    <div class="db-title">';
        html += '        <p>' + data.title + ' ' + data.alt_title + ' (' + data.attrs.year.join(' / ') + ')</p>';
        html += '    </div>';
        html += '    <div class="db-left"><div class="db-poster"><img style="max-width: 135px;" src="' + data.image + '"></div>';
        html += '    <div class="db-score">';
        html += '        <p>' + data.rating.average + ' / ' + data.rating.numRaters + '</p>';
        html += '    </div></div>';
        html += '    <div class="db-info">';
        if (!isEmpty(data.attrs.pubdate)) { html += '        <p>上映时间: ' + data.attrs.pubdate.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.movie_duration)) { html += '        <p>片长: ' + data.attrs.movie_duration.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.title)) { html += '        <p>别名: ' + data.attrs.title.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.director)) { html += '        <p>导演: ' + data.attrs.director.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.writer)) { html += '        <p>编剧: ' + data.attrs.writer.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.cast)) { html += '        <p>主演: ' + data.attrs.cast.join(' / ') + ' </p>'; }
        if (!isEmpty(data.attrs.movie_type)) { html += '        <p>类型: ' + data.attrs.movie_type.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.country)) { html += '        <p>制片国家/地区: ' + data.attrs.country.join(' / ') + '</p>'; }
        if (!isEmpty(data.attrs.language)) { html += '        <p>语言: ' + data.attrs.language.join(' / ') + '</p>'; }
        if (!isEmpty(data.summary)) { html += '        <p>简介: ' + data.summary + '</p>'; }
        html += '    </div>';
        html += '</div>';
        overlib(html);
        var link = data.mobile_link.replace('m.douban.com','douban.com');
        $(aTag).attr('href',link).attr('target','_blank');
    }
    var data = GM_getValue('douBanInfo_' + imdbId, undefined);

    if (undefined !== data && +(new Date()) - data.lastModify < 86400000) {
        showDouBanInfo(data,aTag);
        return;
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.douban.com/v2/movie/imdb/' + imdbId,
        onload: function(response) {
            var data = JSON.parse(response.responseText);
            if (5000 === data.code) {
                overlib('<span>你太潮了,豆瓣都没资料...</span>');
            }else if (!isEmpty(data.alt)) {
                data.lastModify = +(new Date());
                GM_setValue('douBanInfo_' + imdbId, data);
                showDouBanInfo(data,aTag);
            }else{
                overlib('<span>天晓得发生什么是了...</span>');
            }
        },
        onerror: function () {
            overlib('<span>你网络有问题...</span>');
        },
        ontimeout: function () {
            overlib('<span>豆瓣不鸟你...</span>');
        }
    });
});

$('body').on('mouseenter', 'a[data-starId]', function() {
     var starId = $(this).attr('data-starId');
     var data = GM_getValue('starInfo_' + starId, undefined);

    if (undefined !== data) {
        var date = new Date(data);
        overlib('<span>已于'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'收藏了此影片,点击取消收藏</span>');
        return;
    }
    overlib('<span>点击收藏此影片</span>');
});

$('body').on('click', 'a[data-starId]', function() {
     var starId = $(this).attr('data-starId');
     var stared = $(this).attr('data-stared');

    if ('1' == stared) {
        GM_deleteValue('starInfo_' + starId);
        $(this).attr('data-stared','0');
        $(this).find('img').attr('src',emptyStar).css({'height':'18px'});;
        overlib('<span>已取消收藏</span>');
        setTimeout(nd,800);
    }else{
        var date = new Date();
        GM_setValue('starInfo_' + starId,+(date));
        $(this).attr('data-stared','1');
        $(this).find('img').attr('src',solidStar).css({'height':'22px'});
        overlib('<span>已于'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'收藏了此影片,点击取消收藏</span>');
        setTimeout(nd,800);
    }
});

$(document).on('ready AutoPagerize_DOMNodeInserted', function(e) {
    $('a[href^="/torrents.php?imdb="]').each(function(i,e){
        var ee = $(e);
        if(ee.attr('doubaned') =='doubaned') return;
        var imdbId = $(this).attr('href').split("=").pop();
        ee.after('<a data-imdbId="'+imdbId+'" style="margin-left:5px;"><img src="https://img3.doubanio.com/favicon.ico" style="height:18px;"></img></a>');
        var started = GM_getValue('starInfo_' + imdbId, undefined);
        if (undefined === started) {
            ee.after('<a data-starId="'+imdbId+'" style="margin-left:5px;" data-stared="0"><img src="'+emptyStar+'" style="height:18px;"></img></a>')
        }else{
            ee.after('<a data-starId="'+imdbId+'" style="margin-left:5px;" data-stared="1"><img src="'+solidStar+'" style="height:22px;"></img></a>')
        }
        ee.attr('doubaned','doubaned');
    });
    $('.lista span:contains("IMDB:")[hightlighted!=1]').each(function() {
        var txt = $(this).text();
        var rate = txt.match(/MDB: ([\d\.]+)\/\d+/);
        if (undefined !== rate[1] && 6.0 <= parseFloat(rate[1])) {
            $(this).html($(this).text().replace(rate[1], '<span style="color: rgb(183, 0, 0); font-size: large;">' + rate[1] + '</span>')).attr('hightlighted', 1);
        }
    });
    var thisYear = (new Date()).getFullYear();
    var years = [thisYear - 2, thisYear - 1, thisYear];
    for (var i in years) {
        $('a[href^="/torrent/"]:contains("' + years[i] + '")[hightlighted!=1]').each(function() {
            $(this).html($(this).text().replace(years[i], '<span style="font-size: large; font-weight: bold; color: #CE00B9; ">' + years[i] + '</span>')).attr('hightlighted', 1);
        });
    }
});
$(document).bind("ready", function() {});
$(document).ready(function() {
    $(document).trigger("ready");
});
