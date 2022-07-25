puts "📃 Seeding data..."

5.times do 
    User.create(username: Faker::Internet.username,
        email: Faker::Internet.email,
        password_digest: Faker::Internet.password,
        avatar_url: Faker::Avatar.image,
        crops_grown: Faker::Food.fruits,
        in_search_of_crops: Faker::Food.vegetables,
        street_address: Faker::Address.street_address,
        city_address: Faker::Address.city, 
        state_address: Faker::Address.state_abbr,
        zipcode: Faker::Address.postcode)
end

5.times do 
    User.create(username: Faker::Internet.username,
        email: Faker::Internet.email,
        password_digest: Faker::Internet.password,
        avatar_url: Faker::Avatar.image,
        crops_grown: Faker::Food.vegetables,
        in_search_of_crops: Faker::Food.fruits,
        street_address: Faker::Address.street_address,
        city_address: Faker::Address.city, 
        state_address: Faker::Address.state_abbr,
        zipcode: Faker::Address.postcode)
end

random_user = Faker::Number.between(from: 1, to: 10)

25.times do
    Bag.create(user: User.all.id.sample,
        item_name: Faker::Food.fruits,
        descriptions: Faker::Color.color_name,
        harvest_date: Faker::Date.backward(days: 7)
        quantity: Faker::Number.between(from: 1, to: 20)
        measurement_units: Faker::Measurement.weight(amount: "all")
    )
end

puts "✅ Done seeding"