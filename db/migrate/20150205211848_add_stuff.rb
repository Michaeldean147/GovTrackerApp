class AddStuff < ActiveRecord::Migration
  def change
    
    add_column :legislators, :gender, :string
    add_column :legislators, :party, :string

  end
end
