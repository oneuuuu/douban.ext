c:
	rm -f douban-chrome.zip
	zip douban-chrome.zip src/*

f:
	rm -f douban-firefox.zip
	cd src; zip douban-firefox.zip ./*; mv douban-firefox.zip ..
