class ChangeUsersAdminColumnType < ActiveRecord::Migration[6.0]
    def change
        change_column :users, :admin, 'boolean USING CAST(admin AS boolean)'
    end
end
