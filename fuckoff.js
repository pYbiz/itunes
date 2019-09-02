function getEmbedCode()
{
	var input = document.querySelector('.form-control');
	var url = $(input).val();
	var urlRegex =/(?<=itunes.apple.com)\/[\S\s]+\/album[\s\S]+\d+|(?<=music.apple.com)\/[\S\s]+\/album[\s\S]+\d+|(?<=deezer.com)\/[\S\s]+\/album[\s\S]+\d+/;
	var forEmbed = url.match(urlRegex)[0];
	var albumEmbedCode = `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="450" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com${forEmbed}?app=music"></iframe>`;
	var singleEmbedCode = `<iframe allow="autoplay *; encrypted-media *;" frameborder="0" height="150" style="width:100%;max-width:660px;overflow:hidden;background:transparent;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com${forEmbed}?app=music"></iframe>`;

	var albumEmbedCodeEl = document.querySelector('#albumEmbed');
	var singleEmbedCodeEl = document.querySelector('#singleEmbed');

	if(!url.split('.').includes('deezer')) //itunes
	{
		albumEmbedCodeEl.value = albumEmbedCode;
		singleEmbedCodeEl.value = singleEmbedCode;
	}
	else //deezer
	{
		let arr = url.split('/');
	  let album_id = arr[arr.length-1];
		let deezerEmbedCode = `<iframe scrolling="no" frameborder="0" allowTransparency="true" src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=ff0000&layout=dark&size=medium&type=album&id=${album_id}&app_id=1" width="700" height="350"></iframe>`;
		albumEmbedCodeEl.value = deezerEmbedCode;
		singleEmbedCodeEl.value = deezerEmbedCode;
	}

	var btn = document.querySelector('#copyAlbum');
	btn.addEventListener("click", function()
    {
        //select embed code
        albumEmbedCodeEl.select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Album embed code copied!");
    });

    var btn1 = document.querySelector('#copySingle');
    btn1.addEventListener("click", function()
    {
        //select embed code
        singleEmbedCodeEl.select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

		var url_array = document.querySelector('#name').value.split('.');
		if(!url_array.includes('deezer'))//itunes
		{
    	search_album(document.querySelector('#name').value);
		}
		else //deezer
		{
			search_album2(document.querySelector('#name').value);
		}

    var btn2 = document.querySelector('#copyInfo');
    btn2.addEventListener("click", function()
    {
        //select embed code
        document.querySelector('#info').select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

    var btn3 = document.querySelector('#copyTitle');
    btn3.addEventListener("click", function()
    {
        //select embed code
        document.querySelector('#title').select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

		var btn4 = document.querySelector('#copyArtist');
		btn4.addEventListener("click", function()
    {
        //select embed code
        document.querySelector('#artist').select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

		var btn5 = document.querySelector('#copyGenre');
		btn5.addEventListener("click", function()
    {
        //select embed code
        document.querySelector('#genre').select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

		var btn6 = document.querySelector('#copyTitle2');
		btn6.addEventListener("click", function()
    {
        //select embed code
        document.querySelector('#title2').select();
        // Copy the text inside the text field
        document.execCommand("copy");
        // alert("Single embed code copied!");
    });

    btn.style.display = "inline";
    btn1.style.display = "inline";
    albumEmbedCodeEl.style.display = "inline";
    singleEmbedCodeEl.style.display = "inline";
    btn2.style.display = "block";
    document.querySelector('#info').style.display = "block";
    btn3.style.display = "inline";
    document.querySelector('#title').style.display = "inline";
	btn4.style.display = "inline";
	document.querySelector('#artist').style.display = "inline";
	btn5.style.display = "inline";
	document.querySelector('#genre').style.display = "inline";
	btn6.style.display = "inline";
	document.querySelector('#title2').style.display = "inline";
}
