# Lingua

### Backup and Restore Directus Data

Restore: Get-Content backup.sql | docker exec -i {container-name} mysql -u {} -p {} {db-name}
Backup: docker exec {container-name} sh -c 'exec mysqldump -u{} -p{} {db-name}' > backup.sql

cat backup.sql | docker exec -i e157a33a722c mysql -uroot -prootpassword test

iconv -f UTF-16LE -t UTF-8 backup/backup_v2-bookings.sql -o backup_v2-bookings_utf8.sql

<!--  -->

Get-Content backup/backup_language_learning.sql | docker exec -i f6700a9136d9 mysql -uroot -prootpassword test
docker exec e90913fdcb80 sh -c 'exec mysqldump -uroot -prootpassword test' > backup/backup_language_learning.sql




docker exec 9ff95ae14c5c sh -c 'exec mysqldump -uroot -prootpassword --default-character-set=utf8mb4 --skip-set-charset test' > backup/_backup_language_learning.sql
Get-Content backup/test.sql | docker exec -i 4ab4c94c8631 sh -c 'exec mysql -uroot -prootpassword --default-character-set=utf8mb4 test'

docker cp ./mysql_backup 4ab4c94c8631:/var/lib/mysql