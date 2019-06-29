class Description < ApplicationRecord

  validates :colour, presence: true
  validates :additional, length: { maximum: 500 }
end
