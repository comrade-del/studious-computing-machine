class Form < ApplicationRecord
  belongs_to :user
  #validates :user_id, presence: true
  #validates :id_number, presence: true, length: { is: 10 }
end
