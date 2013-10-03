include git

include apt

apt::ppa{ 'ppa:chris-lea/node.js': }
->
package { 'nodejs':
  ensure => latest
}
->
package { ['grunt-cli', 'bower']:
  ensure   => installed,
  provider => npm
}

package { 'compass':
  ensure   => latest,
  provider => gem
}
