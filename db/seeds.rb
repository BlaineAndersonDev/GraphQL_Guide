avatars = [ 
  "http://u.cubeupload.com/WickedAmusingbus/MaleAvatarU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/FemaleAvatarU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/IoloU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/DupreU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/Katrina.gif", 
  "http://u.cubeupload.com/WickedAmusingbus/JuliaU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/Jaana.gif", 
  "http://u.cubeupload.com/WickedAmusingbus/SentriU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/ShaminoU7.png", 
  "http://u.cubeupload.com/WickedAmusingbus/Spark.gif", 
  "http://u.cubeupload.com/WickedAmusingbus/Tseramed.gif" 
]

  5.times do
    user = User.create(name: Faker::Name.name, email: Faker::Internet.email, avatar: avatars[rand(11)])
    (rand(6)).times do
      user.posts.create(title: Faker::Lorem.sentence(word_count: 3), body: Faker::Lorem::paragraph(sentence_count: 3))
    end
  end