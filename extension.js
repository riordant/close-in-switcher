const Clutter = imports.gi.Clutter;

let _origKeyPress = null;
let _Proto = null;

function resolveAppSwitcherProto() {
  // Cinnamon 6.x layout: imports.ui.appSwitcher.appSwitcher.AppSwitcher
  try {
    const M = imports.ui.appSwitcher.appSwitcher;
    if (M && M.AppSwitcher && M.AppSwitcher.prototype) return M.AppSwitcher.prototype;
  } catch (e) { /* fall through */ }

  // Some builds re-export on the directory module (rare but try)
  try {
    const M = imports.ui.appSwitcher;
    if (M && M.AppSwitcher && M.AppSwitcher.prototype) return M.AppSwitcher.prototype;
  } catch (e) { /* fall through */ }

  // Older/future layouts? Add more fallbacks here if needed.
  return null;
}

function enable() {
  _Proto = resolveAppSwitcherProto();
  if (!_Proto) {
    global.log('[close-in-switcher] ERROR: Could not resolve AppSwitcher prototype');
    return;
  }

  // Add helper once
  if (typeof _Proto._closeSelected !== 'function') {
    _Proto._closeSelected = function () {
      if (!this._windows || this._windows.length === 0) return;
      const w = this._windows[this._currentIndex];
      if (w) {
        const ts = (global.get_current_time)
          ? global.get_current_time()
          : global.display.get_current_time_roundtrip();
        w.delete(ts); // graceful close
      }
    };
  }

  // Wrap key handler once
  if (!_origKeyPress) {
    if (typeof _Proto._keyPressEvent !== 'function') {
      global.log('[close-in-switcher] ERROR: _keyPressEvent not found on AppSwitcher');
      return;
    }
    _origKeyPress = _Proto._keyPressEvent;
    _Proto._keyPressEvent = function (actor, event) {
      const sym = event.get_key_symbol();
      if (sym === Clutter.KEY_q || sym === Clutter.KEY_Q) {
        this._closeSelected();
        return true; // consume
      }
      return _origKeyPress.apply(this, arguments);
    };
  }

  global.log('[close-in-switcher] enabled');
}

function disable() {
  if (_Proto && _origKeyPress) {
    _Proto._keyPressEvent = _origKeyPress;
  }
  _origKeyPress = null;
  _Proto = null;
  global.log('[close-in-switcher] disabled');
}


function init() {}
