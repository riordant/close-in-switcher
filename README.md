# Close Window in Alt-Tab Switcher (Cinnamon Extension)

This Cinnamon extension restores a workflow that used to work in older versions of Linux Mint:
when cycling windows with **Alt+Tab** (or **Super+Tab**), you can press **Q** to close the
currently highlighted window directly from the switcher.

## Features

- Press **Q** while the Alt-Tab switcher is open to close the selected window.
- Works with both lowercase `q` and uppercase `Q`.
- Lightweight and minimal patch on Cinnamon's app switcher.

## Installation

### From source (manual install)

1. Clone this repository:

   ```bash
   git clone https://github.com/riordant/close-in-switcher.git
   cd close-in-switcher
   ```

2. Copy the extension into your Cinnamon extensions directory:


   ```bash
    mkdir -p ~/.local/share/cinnamon/extensions
    cp -r close-in-switcher@riordant ~/.local/share/cinnamon/extensions/
    ```

3. Enable it in System Settings → Extensions.



