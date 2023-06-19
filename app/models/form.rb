class Form < ApplicationRecord
  # belongs_to :user
  # validates :user_id, presence: true
  validates :id_number, presence: true, length: { is: 10 }, uniqueness: true
  before_save :downcase_gender

  private

  def downcase_gender
    self.gender = gender.downcase if gender.present?
  end
end
