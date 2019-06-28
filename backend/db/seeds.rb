# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "Seeding Data ..."

# Helper functions
def open_asset(file_name)
  File.open(Rails.root.join('db', 'seed_assets', file_name))
end

# Only run on development (local) instances not on production, etc.
unless Rails.env.development?
  puts "Development seeds only (for now)!"
  exit 0
end

ActiveRecord::Base.connection.disable_referential_integrity do


  puts "Re-creating Addresses ..."

  Address.destroy_all

  (1..10).each do
    Address.create!({
    street_number: Faker::Address.building_number,
    street_name: Faker::Address.street_name,
    apartment: Faker::Address.secondary_address,
    city: Faker::Address.city,
    province: "Quebec",
    postal_code: Faker::Address.zip,

  })
  end


  puts "Re-creating Descriptions ..."

  Description.destroy_all

  (1..5).each do
    Description.create!({
    colour: Faker::Color.color_name,
    breed: Faker::Creature::Cat.breed,
    sex: Faker::Gender.type,
    additional: Faker::Lorem.paragraph,
  })
  end

  (1..5).each do
    Description.create!({
    colour: Faker::Color.color_name,
    breed: Faker::Creature::Dog.breed,
    sex: Faker::Creature::Dog.gender,
    additional: Faker::Lorem.paragraph,
  })
  end

  puts "Re-creating Users ..."

  User.destroy_all

  address_ids = Address.all.pluck(:id)
  alerts = [true, false]

  (1..10).each do
User.create!({
  name: Faker::Name.name,
  email: Faker::Internet.email,
  password_digest: Faker::Games::Dota.hero,
  address_id: address_ids[0],
  phone_number: Faker::PhoneNumber.phone_number,
  alerts: alerts.sample,
  points: rand(0..5000)})

  address_ids.rotate!

  end


  puts "Re-creating Pets ..."

  pet_images = ['https://placedog.net/500', 'https://placedog.net/499', 'https://placedog.net/498', 'https://placedog.net/497', 'https://placedog.net/496']

  Pet.destroy_all

  description_ids = Description.all.pluck(:id)
  users_ids = User.all.pluck(:id)
  comment_ids = Comment.all.pluck(:id)



  (1..10).each do
  Pet.create!({
    name: Faker::Creature::Dog.name,
    species: 'Dog',
    status: "Lost",
    date_lost: Faker::Date.between(7.days.ago, Date.today),
    picture: pet_images[0],
    picture_merged: pet_images[1],
    latitude: rand(45.50..45.70),
    longitude: rand(73.56..73.76),
    address_id: address_ids[0],
    user_id: users_ids[0],
    description_id: description_ids[0],
    # comment_id: comment_ids[0]

  })

  address_ids.rotate!
  description_ids.rotate!
  users_ids.rotate!
  pet_images.rotate!

  end

  puts "Re-creating Comments ..."


  Comment.destroy_all

  pets_ids = Pet.all.pluck(:id)

  (1..2).each do
  Comment.create!({
    user_id: users_ids.sample,
    comment: 'Hello there',
    pet_id: pets_ids.sample 
  })
  end

  puts "DONE!"
end