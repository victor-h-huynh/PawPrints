class User < ApplicationRecord

    has_many :pets
    belongs_to :address

end
