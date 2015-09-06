gawk '
BEGIN{FS=OFS="\t"}
ARGIND==1{
	word[$1]=1;
}
ARGIND==2{
	if (FNR==1 || word[$1]==1)
		print $0;
}' word.mp3 jpwordapp.db.raw > jpwordapp.db.has_mp3.raw 
