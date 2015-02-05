require 'rest_client'
bio_id = []
dataurl_seed = []
response = []
dataarr = []
firstname = []
testtt = []
new = []
sample = []
phone = []
names = []
tweet = []
party = []
chamber = []
crp = []
gender = []
image_files = Dir.glob('app/assets/images/*.jpg')
image_files.each do |ifile|
  new_file = ifile.match(/[\w-]+\./).to_s
  bio_id << new_file.chomp('.')
end
bio_id.each do |id|
dataurl_seed << "https://congress.api.sunlightfoundation.com/legislators?bioguide_id=" + id +  "&apikey=3c471d6192564914bfe7c7c5f5fa9242"
end

dataurl_seed.each do |ii|
  response = RestClient.get(ii)
  new << JSON.parse(response)
end



new.each do |el|
  testit = el["results"]
  if testit.any? == false

    else
     testtt <<  el["results"][0]["first_name"]
     names <<  el["results"][0]["last_name"]
     gender << el["results"][0]["gender"]
     sample <<  el["results"][0]["bioguide_id"]
     phone << el["results"][0]["phone"]
      tweet << el["results"][0]["twitter_id"]
      party << el["results"][0]["party"]
      chamber << el["results"][0]["chamber"]
      crp << el["results"][0]["crp_id"]
    end
 end
@together_now = []
@together_now = testtt.zip(sample, phone, names, tweet, chamber, crp, party, gender)
@together_now.each do |i|
  Legislator.create(first_name: i[0], bio_id: i[1], phone_number: i[2], last_name: i[3], twitter: i[4], chamber: i[5], crp_id: i[6], party: i[7], gender: i[8])
end
