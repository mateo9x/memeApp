alter table users add column language varchar(2) null;

update users set language = 'pl';

alter table users alter column language varchar(2) not null;
