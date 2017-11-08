
exports.up = function(knex, Promise) {

  return Promise.all([

       knex.schema.createTable('users', function(table) {
           table.increments('user_ID').primary();
           table.string('username');
           table.string('password');
       }),

       knex.schema.createTable('stories', function(table){
           table.increments('story_ID').primary();
           table.string('Title');
       }),

       knex.schema.createTable('messages', function(table){
           table.increments('id').primary();
           table.string('message', 255);
           table.integer('user_ID').references('user_ID');
           table.integer('story_ID').references('story_ID');
       })
   ])
};

exports.down = function(knex, Promise) {

};

// knex migrate:latest
// knex migrate:rollback
