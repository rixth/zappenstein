require 'sinatra/base'

module ZapposChallenge
  class Server < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/../public'
    
    get '/' do
      haml :index
    end
    
    get '/application.css' do
      scss :application, :style => :expanded
    end
  end
end