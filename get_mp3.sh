file="words"
ROOT="/home/"
prefix="http://dict.hjenglish.com/jp/jc/"

output="mp3"

while read word
do
	sleep 1
	wget ${prefix}$word -q -O ${ROOT}html/$word.html
	awk '/http\:\/\/d1\.g\.hjfile\.cn\/voice\/jpsound\/.*\.mp3/{match($0,/http\:\/\/d1\.g\.hjfile\.cn\/voice\/jpsound\/.*\.mp3/);print(substr($0,RSTART,RLENGTH));}' ${ROOT}html/$word.html > tmp
	url=`head -1 tmp`
	wget $url -q -O ${ROOT}mp3/$word.mp3
	echo $url
	echo "$word done!"
done < $file