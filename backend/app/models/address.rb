class Address < ApplicationRecord

    belongs_to :user, optional: true
    belongs_to :pet,  optional: true

end
