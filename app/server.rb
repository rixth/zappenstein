require 'sinatra/base'

module ZapposChallenge
  class Server < Sinatra::Base
    set :public, File.dirname(__FILE__) + '/../public'
    
    get '/' do
      haml :index
    end
  end
end