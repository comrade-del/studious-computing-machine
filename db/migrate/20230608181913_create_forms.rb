class CreateForms < ActiveRecord::Migration[7.0]
  def change
    create_table :forms do |t|
      t.string :id_number
      t.string :name
      t.string :gender
      t.string :phone_number
      t.string :address
      t.string :city
      t.string :state
      t.string :house_size
      t.string :relationship
      t.string :marital_status
      t.string :religion
      t.string :education
      t.string :employment
      t.string :income_level
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
