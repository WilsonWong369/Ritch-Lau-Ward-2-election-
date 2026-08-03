Upload instructions - SiteGround (SFTP / File Manager)

1) Prepare a zip of the site files you want to upload (index.php, header.php, footer.php, style.css, script.js, images...)

```bash
# from the project root
zip -r sitephp.zip index.php header.php footer.php style.css script.js website/ images/ || zip -r sitephp.zip . -x "*.git*"
```

2) Get SiteGround SFTP credentials
- Go to Site Tools for your site → Dev → SFTP/SSH (or FTP Accounts) and copy Host, Username, Port, and SFTP password/key.

3) Upload the zip via SFTP (example)

```bash
sftp -P 18765 username@your-siteground-host
# at sftp> prompt
put sitephp.zip
bye
```

(Replace `-P 18765` with the port shown in Site Tools if different.)

4) Unpack on the server
- In SiteGround Site Tools → Site → File Manager you can upload `sitephp.zip` and click to extract into the `public_html` (or domain root) folder.
- If you have SSH, unzip via:

```bash
ssh -p 18765 username@your-siteground-host
# once connected
cd public_html
unzip -o sitephp.zip
rm sitephp.zip
```

5) File permissions (if using SSH):

```bash
# set directories 755, files 644
find public_html -type d -exec chmod 755 {} +
find public_html -type f -exec chmod 644 {} +
```

6) Notes
- SiteGround serves `index.php` by default if present; no further server config required.
- Keep backups (you said autobackup is enabled) before overwriting.
- If your site is WordPress and you intend to use WordPress, do NOT overwrite `wp-content` or the WordPress core — instead upload theme files to `wp-content/themes/your-theme` and activate the theme in WP admin.

7) After upload
- Open your site URL and verify pages load.
- Check browser console for JS errors and the network tab for missing assets.
- If you need help with SFTP credentials or the exact SiteGround host, tell me and I’ll guide you where to find them in Site Tools.