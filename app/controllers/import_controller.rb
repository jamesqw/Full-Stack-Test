class ImportController < ApplicationController
    def create
        ImportJob.perform_now(params['file'])
    end
end
