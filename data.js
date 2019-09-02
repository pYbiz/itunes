var _tracks;
var singleSongFromAlbum = false;
var songFromAlbumTitle = "";
var trackFromAlbum = "";
var trackFromAlbumArtist = "";
var trackFromAlbum_regex;
var specials_regex = /\[|\\|\^|\$|\.|\||\?|\*|\+|\(|\)/ig;
var song_name = "";

var info = document.querySelector('#info');
var title = document.querySelector('#title');
var artist_el = document.querySelector('#artist');
var genre_el = document.querySelector('#genre');
var title2 = document.querySelector('#title2');

function search_album(album)
{
    if(album.match(/i=\d+/))
    {
      singleSongFromAlbum = true;
		  songFromAlbumTitle = decodeURIComponent(album.match(/(?<=album\/)[\s\S]+(?=\/\d+)/ig)[0]);
		  if(songFromAlbumTitle.match(specials_regex))
			   songFromAlbumTitle = songFromAlbumTitle.replace(specials_regex, "\\" + songFromAlbumTitle.match(specials_regex)[0])
		  trackFromAlbum_regex = new RegExp("[\\s\\S]*" + songFromAlbumTitle.replace(/-/g, "[\\s\\S]+") + "[\\s\\S]*", "ig");
	  }

    $.get(album, function(page)
	  {
        document.querySelector("#scrape").innerHTML = page;

		let collection_name = $('.product-header__title').text().trim();
		collection_name = collection_name.replace(/(?<=\s)\- EP\s*/ig, "(EP)");
		let artist = $(".product-header__identity.album-header__identity").text().trim();
		let year = "";
		if(document.querySelectorAll('.inline-list__item.inline-list__item--bulleted').length == 2)
			{year = $('.inline-list__item.inline-list__item--bulleted')[1].children[0].innerText;}
		else
		{
			year = $('.inline-list__item--preorder-media').text().trim();
			year = year.match(/\d{4}/);
		}
		let genre = $('.link.link--no-tint').text().trim();
    let genre2 = genre;
    genre2 = genre2.replace("/Soul", "");
    genre2 = genre2.replace("Hip-Hop/", "");
		let released;
    if($('.link-list__item__date').text().trim())
      released = $('.link-list__item__date').text().trim();
    else
      released = $('.inline-list__item.inline-list__item--preorder-media').text().trim();
    released = released.replace("Expected ", "");
    released = released.replace("Pre-Order: ", "");
		_tracks = $('.we-truncate.we-truncate--single-line.ember-view.table__row__headline.we-selectable-item__link-text__headline');
		let tracks = [];

		let artists = [];
		if(singleSongFromAlbum && artist == "Various Artists")
		{
			_artists = $('.we-truncate.we-truncate--single-line.ember-view.we-selectable-item__link-text__subcopy');
			for(i=0;i<_tracks.length;i++)
			{artists.push(_artists[i].innerText.trim());}
		}

		for(i=0;i<_tracks.length;i++)
		{
			tracks.push(("0" + (i+1)).slice(-2) + " " + _tracks[i].innerText.trim());
			if(singleSongFromAlbum && _tracks[i].innerText.replace("'","").trim().match(trackFromAlbum_regex))
			{
				trackFromAlbum = ("0" + (i+1)).slice(-2) + " " + _tracks[i].innerText.trim();
				song_name = _tracks[i].innerText.trim();
				if(artist == "Various Artists"){trackFromAlbumArtist = artists[i];}
			}
		}

		//album art
		let art = $('.we-artwork__source')[3].srcset.split(',')[2];
		let image_name = artist + " - " + collection_name;
		art = art.replace(/\s\dx/g, "");

		document.querySelector("#downloadBtn").style.display = "block";
		$("#downloadBtn").click(function()
		{
				var x=new XMLHttpRequest();
				x.open("GET", art, true);
				x.responseType = 'blob';
				x.onload=function(e){download(x.response, image_name + ".jpg", "image/jpg" ); }
				x.send();
		});

		//display stuff
		if(tracks.length > 1)
        {
				if(!singleSongFromAlbum)
				{
					/*If the link refers to not just a song from an album/ep AND is more than 1 track
					use displayMultiple*/
					displayMultiple(artist,collection_name,year,genre,genre2,released,tracks);
				}
				else
				{
					/*If the link refers to a SONG FROM AN ALBUM OR EP AND is more than 1 track
					use displaySingle*/
					displaySingle(artist,collection_name,year,genre,genre2,released,tracks);
				}
		}
		else
    {
        //IF it is a single and has ONLY 1 track
        if($("input[name=type]:checked").val() == "song")
        {
            //SONG Radio Button (SINGLE - 1 track)
                artist_el.value = `${artist}`;
                genre_el.value = genre2;
                title.value = `${artist} - ${collection_name.replace("- Single", "")}[CDQ + iTunes]`;
                title2.value = `${artist} - ${collection_name.replace("- Single", "")}`;
                info.value = `Genre: ${genre}\n` + `Released: ${released}\n` +
                `Format: mp3, 320 kbps | m4a, 256 kbps\n`+
                `Site: streethiphop.live`+
                `\nTrack list:\n01. ${collection_name.replace("- Single", "")}`;
        }
        else if($("input[name=type]:checked").val() == "song320")
        {
            //SONG 320 Radio Button (SINGLE - 1 track)
                artist_el.value = `${artist}`;
                genre_el.value = genre2;
                title.value = `${artist} - ${collection_name.replace(" - Single", "")} (CDQ)`;
                title2.value = `${artist} - ${collection_name.replace(" - Single", "")}`;
                info.value = `Genre: ${genre}\n` + `Released: ${released}\n` +
                `Format: mp3 320kbps\n`+
                `Site: streethiphop.live`+
                `\nTrack list:\n01. ${collection_name.replace(" - Single", "")}`;
        }
        else if($("input[name=type]:checked").val() == "songitunes")
        {
			//SONG iTunes Radio Button (SINGLE - 1 track)
                artist_el.value = `${artist}`;
                genre_el.value = genre2;
                title.value =  `${artist} - ${collection_name.replace(" - Single", "")}.m4a [iTunes Plus M4A]`;
                title2.value = `${artist} - ${collection_name}`;
                info.value = `Genre: ${genre}\n` + `Released: ${released}\n` +
                `Format: m4a 256 kbps\n`+
                `Site: streethiphop.live`+
                `\nTrack list:\n01. ${collection_name.replace(" - Single", "")}`;
        }
        else
        {
            //SONG but not a SONG radio button is selected, it's the same with "SONG" (SINGLE - 1 track)
                artist_el.value = `${artist}`;
                genre_el.value = genre2;
                title.value = `${artist} - ${collection_name.replace("- Single", "")} (${year})`;
                title2.value = `${artist} - ${collection_name}`;
                info.value = `Genre: ${genre}\n` + `Released: ${released}\n` +
                `Format: mp3, 320 kbps | m4a, 256 kbps\n`+
                `Site: streethiphop.live`+
                `Track list:\n01. ${collection_name.replace("- Single", "")}`;
        }
      }
    });
}

function displayMultiple(artist,collection_name,year,genre,genre2,released,tracks)
{
  /*
  if(tracks.length <= 3) //single
  {
    if($("input[name=type]:checked").val() == "song")//SONG Radio Button (SINGLE more than 1 tracks)
		{
            artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps CDQ / iTunes Plus M4A download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "song320")//SONG 320 Radio Button (SINGLE more than 1 tracks)
		{
            artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (CDQ)`;
            title2.value = `${artist} - ${collection_name}`;
			info.value = `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3 320 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "songitunes")//SONG iTunes Radio Button (SINGLE more than 1 tracks)
		{
            artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `iTunes Plus M4A download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A\n` + `Quality: 256 kbps\n`+
			`Track list:\n`;
		}
		else //SONG but not a SONG radio button is selected, it's the same with "SONG" (SINGLE more than 1 tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps CDQ / iTunes Plus M4A download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
	}//*/
	if(tracks.length > 1 && tracks.length <= 7) //ep
	{
    collection_name = collection_name.replace(" - Single", "");
    if(!collection_name.match(/\s\-\sEP/) && !collection_name.match(/\(EP\)/)){collection_name+= " (EP)";}
		if($("input[name=type]:checked").val() == "ep") //EP Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [320 + iTunes]`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "ep320") //EP 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
            title2.value = `${artist} - ${collection_name.replace("(EP)", "")}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3 320 kbps\n`+
			`Track list:\n`;

		}
		else if($("input[name=type]:checked").val() == "epitunes") //EP iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: m4a, 256 kbps\n`+
			`Track list:\n`;
		}
		else //EP but not an EP radio button is selected, it's the same with "EP" (multiple tracks)
		{
      console.log(collection_name);
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
			`Track list:\n`;
		}
	}
	else if(tracks.length >= 8) //album
	{
		if($("input[name=type]:checked").val() == "album") //ALBUM Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [320 + iTunes]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "album320") //ALBUM 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `Album: ${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, 320 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "albumitunes") //ALBUM iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: m4a | 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "albumad") //ALBUM Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
            info.value = `Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "albumsnahp") //ALBUM Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `[MEGA] ${artist} - ${collection_name}-WEB-${year}`;
            title2.value = `${artist} - ${collection_name} (${year})`;
			info.value = `Track list:\n`;
		}
    //Soundtracks
    else if($("input[name=type]:checked").val() == "soundtracks") //soundtracks Radio Button
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [320 + iTunes]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "soundtrack320") //Soundtracks 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3 320 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "soundtrackitunes") //Soundtracks iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
    //Mixtapes
    else if($("input[name=type]:checked").val() == "mixtapes") //Mixtapes Radio Button
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `Mixtape: ${artist} - ${collection_name} (${year}) [320 + iTunes]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "mixtape320") //Mixtapes 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `Mixtape: ${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3 320 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
		else if($("input[name=type]:checked").val() == "mixtapeitunes") //Mixtapes iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `Mixtape: ${artist} - ${collection_name} (${year}) [iTunes Plus M4A]`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
    else //ALBUM but not an ALBUM radio button is selected, it's the same with "ALBUM" (multiple tracks)
		{
            artist_el.value = `${artist}`;
			genre_el.value = genre2;
			title.value = `${artist} - ${collection_name} (${year})`;
            title2.value = `${artist} - ${collection_name}`;
			info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: mp3, 320 kbps | m4a, 256 kbps\n`+
            `Site: streethiphop.live`+
			`\nTrack list:\n`;
		}
  }

    tracks.forEach(function(track)
	{
        info.value += `${track}\n`;
	});
}

function displaySingle(artist,collection_name,year,genre,genre2,released,tracks)
{
  let _artist = artist;
  if(artist == "Various Artists"){_artist = trackFromAlbumArtist;}

	if($("input[name=type]:checked").val() == "song") //SONG Radio Button (single track from ep/album)
  {
    artist_el.value = `${_artist}`;
    genre_el.value = genre2;
    title.value = `${_artist} - ${song_name} [CDQ + iTunes]`;
    title2.value = `${_artist} - ${song_name}`;
    info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
    `Format: mp3, 320 kbps | m4a, 256 kbps\n`+
    `Track list:\n${trackFromAlbum.replace("- Single", "")}`;
  }
  else if($("input[name=type]:checked").val() == "song320") //SONG 320 Radio Button (single track from ep/album)
  {
    artist_el.value = `${_artist}`;
    genre_el.value = genre2;
    title.value = `${_artist} - ${song_name} (CDQ)`;
    title2.value = `${_artist} - ${song_name}`;
    info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
    `Format: MP3 320kbps\n`+
    `Track list:\n${trackFromAlbum.replace("- Single", "")}`;
  }
  else if($("input[name=type]:checked").val() == "songitunes")//SONG iTunes Radio Button (single track from ep/album)
  {
    artist_el.value = `${_artist}`;
    genre_el.value = genre2;
    title.value = `${_artist} - ${song_name}.m4a [iTunes Plus M4A]`;
    title2.value = `${_artist} - ${song_name}`;
    info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
    `Format: M4A 256 kbps\n`+
    `Track list:\n${trackFromAlbum.replace("- Single", "")}`;
  }
  else //SONG but not a SONG radio button is selected, it's the same with "SONG" (single track from ep/album)
  {
    artist_el.value = `${_artist}`;
    genre_el.value = genre2;
    title.value = `${_artist} - ${song_name} (${year})`;
    title2.value = `${_artist} - ${song_name}`;
    info.value =  `Genre: ${genre}\n` + `Released: ${released}\n` +
    `Format: mp3, 320 kbps | m4a, 256 kbps\n\n`+
    `Track list:\n${trackFromAlbum.replace("- Single", "")}`;
  }
}

// setInterval(()=>{console.clear();},1000);
