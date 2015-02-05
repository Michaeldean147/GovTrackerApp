image_files = Dir.glob('app/assets/images/*.jpg')
image_files.each do |ifile|
  new_file = ifile.match(/[\w-]+\./).to_s
  puts new_file.chomp('.')
end
