class Address < ApplicationRecord

    belongs_to :user, optional: true
    has_many :pet

    validates :street_name, 
        length: { minimum: 3 }, 
        format: { with: /[a-zA-Z]/},
        presence: true
    validates :city, 
        length: { minimum: 5 }, 
        format: { with: /[a-zA-Z]/},
        presence: true
    validates :province, 
        length: { minimum: 2 }, 
        format: { with: /[a-zA-Z]/},
        presence: true
    validates :postal_code, 
        length: { minimum: 6 }, 
        format: { with: /[a-zA-Z0-9]/},
        presence: true
end
