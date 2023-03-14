alter table memes rename column photo_url to url;

alter table memes add column is_video boolean null;

update memes set is_video = false where is_video is null;

insert into memes (id, title, url, date_created, date_approved, user_id, up_votes, down_votes, approved, tags, is_video)
values (6, 'Jak strzelać', 'memes/2/6_shoot.mp4', '2023-03-14 00:00:00', null, 2, 0, 0, false, null, true);
