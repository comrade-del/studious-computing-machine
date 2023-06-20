class Form < ApplicationRecord
  # belongs_to :user
  # validates :user_id, presence: true
  before_save :downcase_gender
  validates :id_number, presence: true, length: { is: 10 }, uniqueness: true
  validates :name, presence: true
  validates :gender, presence: true
  validates :phone_number, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :house_size, presence: true
  validates :relationship, presence: true
  validates :marital_status, presence: true
  validates :religion, presence: true
  validates :education, presence: true
  validates :employment, presence: true
  validates :income_level, presence: true

  private

  def downcase_gender
    self.gender = gender.downcase if gender.present?
  end
end
