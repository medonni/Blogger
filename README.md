# FakeBlogger

## Small app created to demonstrate knowledge of Vue framework

There is login for two accounts, user/user and admin/admin. On login, an API is called which gives us access to 100 dummy posts, which are saved in VUEX store, and iterated within Vue.

User account can only view and search posts, which are displayed as cards.
Admin account can do basic CRUD operations on posts, which are displayed within a table.

The CRUD operations are done via VUEX mutations.

For generating profile avatars I've used https://api.multiavatar.com/
