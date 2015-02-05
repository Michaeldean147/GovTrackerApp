class Legislators < ActiveRecord::Migration
  def change
    create_table :legislators do |t|
      t.string :first_name
      t.string :last_name
      t.string :bio_id
      t.string :chamber
      t.string :twitter
      t.string :crp_id
      t.string :phone_number

      t.timestamps
    end

  end
end
