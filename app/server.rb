require 'sinatra/base'

module Zappenstein
  class Server < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/../public'
    
    get '/' do
      haml :index
    end
    
    get '/application.css' do
      scss :application, :style => :expanded
    end
    
    get '/favicon.ico' do
      status 204
    end
  end
end