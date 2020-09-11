const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token; //'NzUyODc1Nzc5MTgzODcwMDgz.X1eANQ.RxUdNoCfNnVdoc8OLVWVokPQvaU'
const welcomeChannelName = "안녕하세요";
const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "어서오세요.";
const byeChannelComment = "꺼져.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "주게임 미정"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '메타몬 미안해') {
    return message.reply('뭐가 미안한데? 맨날 그런식이야!');
  }

  if(message.content == '메타몬 꺼져') {
    return message.reply('응 당신이나~');
  }

  if(message.content == '메타몬') {
    return message.reply('뭐');
  }

  if(message.content == '메타몬 안녕') {
    return message.reply('메타 메타~');
  }

  if(message.content == '메타몬 사랑해') {
    return message.reply('난 조금만');
  }

  if(message.content == '메타몬 변신해') {
    var Change = Math.random();

    switch(Math.floor(Change * 4+1))
    {
      case 1: 
        return message.reply('피카? 츄?');
        break;  
      case 2:
        return message.reply('이브 이브이~');
        break;
      case 3:
        return message.reply('푸푸루루 푸푸루 푸린~');
        break;
      case 4:
        return message.reply('마쨔아아아아앙아ㅏ아아아앙용!');
        break;
    }
  }

  if(message.content == '메타몬 지금 몇시야' || message.content == '메타몬 몇시야') {
    return message.reply('우측 하단을 직접 보지?');
  }

  if(message.content == '메타몬 오늘할 게임 정해줘' || message.content == '메타몬 오늘할 게임을 정해줘') {
    // var game  = Math.floor(game * 4 + 1);
    var game = Math.random();

    switch(Math.floor(game * 9+1))
    {
      case 1: 
        return message.reply('응 닥 배그~');
        break;  
      case 2:
        return message.reply('리그오브 레궤노~');
        break;
      case 3:
        return message.reply('메이플스토리 하자 feat. 진우 Princess~');
        break;
      case 4:
        return message.reply('제가 임포임메타^^');
        break;
      case 5:
        return message.reply('지금 게임할 때임? 공부나 해ㅡㅡ');
        break;
      case 6: 
        return message.reply('응 닥 배그~');
        break;  
      case 7:
        return message.reply('리그오브 레궤노~');
        break;
      case 8:
        return message.reply('메이플스토리 하자 feat. 진우 Princess~');
        break;
      case 9:
        return message.reply('제가 임포임메타^^');
        break;
    }
  }

  if(message.content == '메타몬 정보') {
    let img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
    let embed = new Discord.RichEmbed()
      .setAuthor('메타몬')
      .setTitle('정보')      
      .addField('메타몬 스킬트리', 'ping\n메타몬\n메타몬 안녕\n메타몬 꺼져\n메타몬 사랑해\n메타몬 변신해\n메타몬 미안해\n메타몬 지금 몇시야\n메타몬 몇시야\n메타몬 오늘할 게임 정해줘')
      .addBlankField()
      .setTimestamp()
      .setFooter('예지공주님이 만듬')

    message.channel.send(embed)
  }
  

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

client.login(token);