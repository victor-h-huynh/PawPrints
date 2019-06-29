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

  Address.create!({
    street_number: 1,
    street_name: "St.Laurent",
    apartment: 1,
    city: "Montreal",
    province: "Quebec",
    postal_code: "A1A B2B"
  })

  Address.create!({
    street_number: 2,
    street_name: "St.Gaspe",
    apartment: 2,
    city: "Montreal",
    province: "Quebec",
    postal_code: "C3C D4D"
  })

  Address.create!({
    street_number: 3,
    street_name: "St.Denis",
    apartment: 3,
    city: "Montreal",
    province: "Quebec",
    postal_code: "E5E F6F"
  })

  Address.create!({
    street_number: 4,
    street_name: "Mont Royal",
    apartment: 4,
    city: "Montreal",
    province: "Quebec",
    postal_code: "G7G H8H"
  })

  Address.create!({
    street_number: 5,
    street_name: "St.Francis",
    apartment: 5,
    city: "Montreal",
    province: "Quebec",
    postal_code: "J9J K1K"
  })

  # (1..10).each do
  #   Address.create!({
  #   street_number: Faker::Address.building_number,
  #   street_name: Faker::Address.street_name,
  #   apartment: Faker::Address.secondary_address,
  #   city: Faker::Address.city,
  #   province: "Quebec",
  #   postal_code: Faker::Address.zip,

  # })
  # end

  

  puts "Re-creating Descriptions ..."

  Description.destroy_all

  Description.create!({
    colour: "black",
    breed: "persian",
    sex: "male",
    additional: "He scares easily!",
  })

  Description.create!({
    colour: "orange",
    breed: "bengal",
    sex: "male",
    additional: "He scratches. Be careful!",
  })

  Description.create!({
    colour: "white",
    breed: "sphynx",
    sex: "female",
    additional: "She likes to chase mice!",
  })

  Description.create!({
    colour: "brown",
    breed: "somali",
    sex: "female",
    additional: "She likes to eat bugs",
  })

  # (1..5).each do
  #   Description.create!({
  #   colour: Faker::Color.color_name,
  #   breed: Faker::Creature::Cat.breed,
  #   sex: Faker::Gender.type,
  #   additional: Faker::Lorem.paragraph,
  # })
  # end

  # (1..5).each do
  #   Description.create!({
  #   colour: Faker::Color.color_name,
  #   breed: Faker::Creature::Dog.breed,
  #   sex: Faker::Creature::Dog.gender,
  #   additional: Faker::Lorem.paragraph,
  # })
  # end

  Description.create!({
    colour: "brown",
    breed: "corgi",
    sex: "male",
    additional: "He likes to play fetch",
  })

  Description.create!({
    colour: "black",
    breed: "rottweiler",
    sex: "male",
    additional: "He barks really loud",
  })

  Description.create!({
    colour: "white",
    breed: "pug",
    sex: "female",
    additional: "She is scared of people",
  })

  Description.create!({
    colour: "orange",
    breed: "golden retriever",
    sex: "female",
    additional: "She barks at other dogs",
  })

  puts "Re-creating Users ..."

  User.destroy_all

  address_ids = Address.all.pluck(:id)

  User.create!({
    name: "robin",
    email: "robin@gmail.com",
    password_digest: "abc123456",
    address_id: address_ids[0],
    phone_number: 1112223333,
    alerts: false,
    points: rand(0..5000)
  })

  User.create!({
    name: "gabriel",
    email: "gabriel@gmail.com",
    password_digest: "abc123456",
    address_id: address_ids[1],
    phone_number: 2223334444,
    alerts: false,
    points: rand(0..5000)
  })

  User.create!({
    name: "josh",
    email: "josh@gmail.com",
    password_digest: "abc123456",
    address_id: address_ids[2],
    phone_number: 5556667777,
    alerts: false,
    points: rand(0..5000)
  })

  User.create!({
    name: "victor",
    email: "victor@gmail.com",
    password_digest: "abc123456",
    address_id: address_ids[3],
    phone_number: 8889991111,
    alerts: false,
    points: rand(0..5000)
  })

  # (1..10).each do
  # User.create!({
  #   name: Faker::Name.name,
  #   email: Faker::Internet.email,
  #   password_digest: Faker::Games::Dota.hero,
  #   address_id: address_ids[0],
  #   phone_number: Faker::PhoneNumber.phone_number,
  #   alerts: alerts.sample,
  #   points: rand(0..5000)})

  # address_ids.rotate!

  # end


  puts "Re-creating Pets ..."

  pet_images = ['https://placedog.net/500', 'https://placedog.net/499', 'https://placedog.net/498', 'https://placedog.net/497', 'https://placedog.net/496']

  Pet.destroy_all

  description_ids = Description.all.pluck(:id)
  users_ids = User.all.pluck(:id)
  comment_ids = Comment.all.pluck(:id)

  Pet.create!({
    name: "Hello Kitty",
    species: 'Cat',
    status: "Lost",
    date_lost: Faker::Date.between(7.days.ago, Date.today),
    picture: pet_images[0],
    picture_merged: pet_images[0],
    latitude: rand(45.50..45.70),
    longitude: -73.56712,
    address_id: address_ids[0],
    user_id: users_ids[0],
    description_id: description_ids[0]
  })

  Pet.create!({
    name: "Santa Paws",
    species: 'Dog',
    status: "Found",
    date_lost: Faker::Date.between(7.days.ago, Date.today),
    picture: pet_images[1],
    picture_merged: pet_images[1],
    latitude: rand(45.50..45.70),
    longitude: -73.76688,
    address_id: address_ids[1],
    user_id: users_ids[1],
    description_id: description_ids[1]
  })

  Pet.create!({
    name: "Chew Barka",
    species: 'Dog',
    status: "Reunited",
    date_lost: Faker::Date.between(7.days.ago, Date.today),
    picture: pet_images[2],
    picture_merged: pet_images[2],
    latitude: rand(45.50..45.70),
    longitude: -73.64900,
    address_id: address_ids[2],
    user_id: users_ids[2],
    description_id: description_ids[2]
  })


  # (1..10).each do
  # Pet.create!({
  #   name: Faker::Creature::Dog.name,
  #   species: 'Dog',
  #   status: "Lost",
  #   date_lost: Faker::Date.between(7.days.ago, Date.today),
  #   picture: pet_images[0],
  #   picture_merged: pet_images[1],
  #   latitude: rand(45.50..45.70),
  #   longitude: rand(73.56..73.76),
  #   address_id: address_ids[0],
  #   user_id: users_ids[0],
  # })

  # address_ids.rotate!
  # description_ids.rotate!
  # users_ids.rotate!
  # pet_images.rotate!

  # end

  puts "Re-creating Comments ..."


  Comment.destroy_all

  pets_ids = Pet.all.pluck(:id)

  Comment.create!({
    user_id: users_ids.sample,
    comment: 'Hello there',
    pet_id: pets_ids.sample 
  })

  Comment.create!({
    user_id: users_ids.sample,
    comment: 'Howdy partner',
    pet_id: pets_ids.sample 
  })

  Comment.create!({
    user_id: users_ids.sample,
    comment: 'Bonjour',
    pet_id: pets_ids.sample 
  })

  # (1..10).each do
  # Comment.create!({
  #   user_id: users_ids.sample,
  #   comment: 'Hello there',
  #   pet_id: pets_ids.sample 
  # })
  # end

  puts "DONE!"
end