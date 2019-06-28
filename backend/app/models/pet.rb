class Pet < ApplicationRecord
    has_many :comments
    belongs_to :user, optional: true
    belongs_to :address, optional: true
    belongs_to :description, optional: true

    
end
