class AddFullNameAvatarImageRoleToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :full_name, :string
    add_column :users, :avatar_image, :string
    add_column :users, :admin, :integer
  end
end
