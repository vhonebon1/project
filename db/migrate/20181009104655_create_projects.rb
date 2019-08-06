class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string "title"
      t.boolean "done"
      t.string "description"
      t.strong "url"
  end
end
