function search_album2(album)
{
  let deezer_array = album.split('/');
  let id = deezer_array[deezer_array.length-1];

  let proxy = "https://cors-anywhere.herokuapp.com/";
  let api = `https://api.deezer.com/album/${id}`;
  fetch(proxy+api)
    .then(response=>{return response.json()})
    .then(data=>
    {
      if(data.nb_tracks > 1) //ep/album
      {
        displayMultiple2(data);
      }
      else //single
      {
        let artist = data.artist.name;
        let contributors = "";
        let contributors_array = [];
        for(i=0;i<data.contributors.length;i++)
        {
          if(data.contributors[i].name != artist)
          {
            contributors += data.contributors[i].name + ", ";
            contributors_array.push(data.contributors[i].name);
          }
        }
        contributors = contributors.replace(/,\s$/,'');
        let genre;
        if(data.genre_id != -1)
        {
          genre = data.genres.data[0].name;
        }
        else
        {
          genre = " ";
        }
        let collection_name = data.title;
        let release_date = new Date(data.release_date);
        let released = release_date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric'});
        let year = release_date.toLocaleString('en-us', {year: 'numeric'});
        //IF it is a single and has ONLY 1 track
        if($("input[name=type]:checked").val() == "song")
        {
          //SONG Radio Button (SINGLE - 1 track)
          artist_el.value = `${artist}, ${contributors}`;
          genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
          if(contributors_array.length == 0)
            title.value = `${artist} - ${collection_name.replace("- Single", "")} [iTunes Plus M4A + Mp3 CDQ]`;
          else if(contributors_array.length == 1)
            title.value = `${artist} & ${contributors_array[0]} - ${collection_name.replace("- Single", "")} [iTunes Plus M4A + Mp3 CDQ]`;
          else
            title.value = `${artist} - ${collection_name.replace("- Single", "")} (feat. ${contributors}) [iTunes Plus M4A + Mp3 CDQ]`;
          title2.value = `${artist} - ${collection_name.replace("- Single", "")}`;
          info.value = `Mp3 - 320kbps CDQ / iTunes Plus M4A download\n`+
          `Genre: ${genre}\n` + `Released: ${released}\n` +
          `Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
          `Track list:\n01. ${collection_name.replace("- Single", "")}`;
        }
        else if($("input[name=type]:checked").val() == "song320")
        {
          //SONG 320 Radio Button (SINGLE - 1 track)
          artist_el.value = `${artist}, ${contributors}`;
          genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
          if(contributors_array.length == 0)
            title.value = `${artist} - ${collection_name.replace(" - Single", "")}.mp3 (CDQ)`;
          else if(contributors_array.length == 1)
            title.value = `${artist} & ${contributors_array[0]} - ${collection_name.replace(" - Single", "")}.mp3 (CDQ)`;
          else
            title.value = `${artist} - ${collection_name.replace(" - Single", "")} (feat. ${contributors}).mp3 (CDQ)`;
          title2.value = `${artist} - ${collection_name.replace(" - Single", "")}`;
          info.value = `Mp3 - 320kbps CDQ download\n` +
          `Genre: ${genre}\n` + `Released: ${released}\n` +
          `Format: MP3\n` + `Quality: 320\n`+
          `Track list:\n01. ${collection_name.replace(" - Single", "")}`;
        }
        else if($("input[name=type]:checked").val() == "songitunes")
        {
			    //SONG iTunes Radio Button (SINGLE - 1 track)
          artist_el.value = `${artist}, ${contributors}`;
          genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
          if(contributors_array.length == 0)
            title.value =  `${artist} - ${collection_name.replace(" - Single", "")}.m4a [iTunes Plus M4A]`;
          else if(contributors_array.length == 1)
            title.value =  `${artist} & ${contributors_array[0]} - ${collection_name.replace(" - Single", "")}.m4a [iTunes Plus M4A]`;
          else
            title.value =  `${artist} - ${collection_name.replace(" - Single", "")} (feat. ${contributors}).m4a [iTunes Plus M4A]`;
          title2.value = `${artist} - ${collection_name}`;
          info.value = `iTunes Plus M4A download\n` +
          `Genre: ${genre}\n` + `Released: ${released}\n` +
          `Format: M4A\n` + `Quality: 256 kbps\n`+
          `Track list:\n01. ${collection_name.replace(" - Single", "")}`;
        }
        else
        {
          //SONG but not a SONG radio button is selected, it's the same with "SONG" (SINGLE - 1 track)
          artist_el.value = `${artist}, ${contributors}`;
          genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
          if(contributors_array.length == 0)
            title.value = `${artist} - ${collection_name.replace("- Single", "")} (${year})`;
          else if(contributors_array.length == 1)
            title.value = `${artist} & ${contributors_array[0]} - ${collection_name.replace("- Single", "")} (${year})`;
          else
            title.value = `${artist} - ${collection_name.replace("- Single", "")} (feat. ${contributors}) (${year})`;
          title2.value = `${artist} - ${collection_name}`;
          info.value = `Mp3 - 320kbps CDQ / iTunes Plus M4A download\n` +
          `Genre: ${genre}\n` + `Released: ${released}\n` +
          `Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
          `Track list:\n01. ${collection_name.replace("- Single", "")}`;
        }
      }
    });
}

function displayMultiple2(data)
{
  let artist = data.artist.name;
  let contributors = "";
  let contributors_array = [];
  for(i=0;i<data.contributors.length;i++)
  {
    if(data.contributors[i].name != artist)
    {
      contributors += data.contributors[i].name + ", ";
      contributors_array.push(data.contributors[i].name);
    }
  }
  contributors = contributors.replace(/,\s$/,'');
  let genre;
  if(data.genre_id != -1)
  {
    genre = data.genres.data[0].name;
  }
  else
  {
    genre = " ";
  }
  let collection_name = data.title;
  let release_date = new Date(data.release_date);
  let released = release_date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric'});
  let year = release_date.toLocaleString('en-us', {year: 'numeric'});
  let tracks = [];
  for(i=0;i<data.tracks.data.length;i++)
  {
    tracks.push(("0" + (i+1)).slice(-2) + " " + data.tracks.data[i].title);
  }

  if(tracks.length > 1 && tracks.length <= 7) //ep
  {
    collection_name = collection_name.replace(" - Single", "");
    if(!collection_name.match(/\s\-\sEP/) && !collection_name.match(/\(EP\)/)){collection_name+= " (EP)";}
		if($("input[name=type]:checked").val() == "ep") //EP Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [Mp3 - 320kbps + iTunes Plus M4A]`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [Mp3 - 320kbps + iTunes Plus M4A]`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [Mp3 - 320kbps + iTunes Plus M4A]`;
      title2.value = `${artist} - ${collection_name.replace("(EP)", "")}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A full ep zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "ep320") //EP 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [Mp3 - 320kbps]`;
      title2.value = `${artist} - ${collection_name.replace("(EP)", "")}`;
			info.value =  `Mp3 - 320kbps full ep zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3\n` + `Quality: 320 kbps\n`+
			`Track list:\n`;

		}
		else if($("input[name=type]:checked").val() == "epitunes") //EP iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A]`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [iTunes Plus M4A]`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [iTunes Plus M4A]`;
      title2.value = `${artist} - ${collection_name.replace("(EP)", "")}`;
			info.value =  `iTunes Plus AAC M4A full ep zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A\n` + `Quality: 256 kbps\n`+
			`Track list:\n`;
		}
		else //EP but not an EP radio button is selected, it's the same with "EP" (multiple tracks)
		{
      console.log(collection_name);
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year})`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year})`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year})`;
      title2.value = `${artist} - ${collection_name.replace("(EP)", "")}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A full ep zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
  }
  else if(tracks.length >= 8) //album
  {
    if($("input[name=type]:checked").val() == "album") //ALBUM Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Full album: ${artist} - ${collection_name} (${year}) [320 + iTunes]`;
      else if(contributors_array.length == 1)
			   title.value = `Full album: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [320 + iTunes]`;
      else
			   title.value = `Full album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [320 + iTunes]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A full album zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "album320") //ALBUM 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Album: ${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else if(contributors_array.length == 1)
			   title.value = `Album: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else
			   title.value = `Album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [Mp3 - 320kbps]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps full album zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3\n` + `Quality: 320 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "albumitunes") //ALBUM iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [iTunes Plus M4A] (Album)`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `iTunes Plus AAC M4A full album zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A\n` + `Quality: 256 kbps\n`+
			`Track list:\n`;
		}
    //soundtracks
    else if($("input[name=type]:checked").val() == "soundtracks") //soundtracks Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Soundtracks: ${artist} - ${collection_name} (${year}) [320 + iTunes]`;
      else if(contributors_array.length == 1)
			   title.value = `Soundtracks: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [320 + iTunes]`;
      else
			   title.value = `Full album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [320 + iTunes]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A soundtracks zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "soundtrack320") //soundtracks 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Soundtracks: ${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else if(contributors_array.length == 1)
			   title.value = `Soundtracks: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else
			   title.value = `Album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [Mp3 - 320kbps]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps soundtracks zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3\n` + `Quality: 320 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "soundtrackitunes") //soundtracks iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [iTunes Plus M4A] (Album)`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `iTunes Plus AAC M4A soundtracks zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A\n` + `Quality: 256 kbps\n`+
			`Track list:\n`;
		}
    //mixtapes
    else if($("input[name=type]:checked").val() == "mixtapes") //mixtapes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Mixtapes: ${artist} - ${collection_name} (${year}) [320 + iTunes]`;
      else if(contributors_array.length == 1)
			   title.value = `Mixtapes: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [320 + iTunes]`;
      else
			   title.value = `Full album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [320 + iTunes]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A mixtapes zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "mixtape320") //mixtapes 320 Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `Mixtapes: ${artist} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else if(contributors_array.length == 1)
			   title.value = `Mixtapes: ${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [Mp3 - 320kbps]`;
      else
			   title.value = `Album: ${artist} - ${collection_name} (feat. ${contributors}) (${year}) [Mp3 - 320kbps]`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps mixtapes zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3\n` + `Quality: 320 kbps\n`+
			`Track list:\n`;
		}
		else if($("input[name=type]:checked").val() == "mixtapeitunes") //mixtapes iTunes Radio Button (multiple tracks)
		{
			artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year}) [iTunes Plus M4A] (Album)`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year}) [iTunes Plus M4A] (Album)`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `iTunes Plus AAC M4A mixtapes zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: M4A\n` + `Quality: 256 kbps\n`+
			`Track list:\n`;
		}
		else //ALBUM but not an ALBUM radio button is selected, it's the same with "ALBUM" (multiple tracks)
		{
      artist_el.value = `${artist}, ${contributors}`;
			genre_el.value = `${genre.replace(/Rap\/Hip Hop/ig, "Rap")}`;
      if(contributors_array.length == 0)
			   title.value = `${artist} - ${collection_name} (${year})`;
      else if(contributors_array.length == 1)
			   title.value = `${artist} & ${contributors_array[0]} - ${collection_name} (${year})`;
      else
			   title.value = `${artist} - ${collection_name} (feat. ${contributors}) (${year})`;
      title2.value = `${artist} - ${collection_name}`;
			info.value =  `Mp3 - 320kbps / iTunes Plus AAC M4A full album zip download\n` +
			`Genre: ${genre}\n` + `Released: ${released}\n` +
			`Format: MP3, M4A\n` + `Quality: 320, 256 kbps\n`+
			`Track list:\n`;
		}
  }

  tracks.forEach(function(track)
  {
    info.value += `${track}\n`;
  });
}
