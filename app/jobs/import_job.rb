class ImportJob < ApplicationJob
  queue_as :default

  require 'csv'
  def perform(file)
    CSV.foreach(file.path, {headers: true, col_sep: ';'}) do |row|
        user = row.to_hash
        User.create! user
    end
  end
end
