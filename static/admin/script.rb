require 'csv'
# headers: Category,Name,Price,Small,Medium,Large,Description


file = CSV.read("/Users/nataliedjerf/src/tonys-cms/static/admin/menu_2022.csv", headers: true)
chars = ["&", ",",".","(",")","'"]
file.each do |f|

    name = f["Name"].delete("&").delete(",").delete("(").delete(")").delete(".").delete("'").downcase
    if name.include?("  ")
        name = name.gsub("  ","-")
    else
        name = name.gsub(" ","-")
    end

    md_file = "#{f["Category"]}-#{name}"
    new_file = File.new("/Users/nataliedjerf/src/tonys-cms/content/menu/#{md_file}.md", "w")
    
    new_file.write("---\n")
    if (f["Category"])
        new_file.write("category: #{f['Category']}\n")
    end

    if (f["Name"])
        new_file.write("name: #{f['Name']}\n")
        new_file.write("title: #{f['Name']}\n")
    end

    if (f["Price"])
        new_file.write("price: '#{f['Price']}'\n")
    end

    if (f["Small"])
        new_file.write("small_price: '#{f['Small']}'\n")
    end

    if (f["Medium"])
        new_file.write("medium_price: '#{f['Medium']}'\n")
    end

    if (f["Large"])
        new_file.write("large_price: '#{f['Large']}'\n")
    end

    if (f["Description"])
        new_file.write("description: #{f['Description']}\n")
    end
    
    new_file.write("---")
end


