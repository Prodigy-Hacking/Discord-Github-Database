const Discord = require("discord.js");
const bot = new Discord.Client();
const token = require('./token.json')
const credentials = require('./credentials.json')
const fetch = require('node-fetch')
const btoa = require('btoa')
const prefix = "";
bot.on('ready', () => {
    console.log('Online');
    bot.user.setActivity(';help', {
        type: 'PLAYING'
    }).catch(console.error);

})

let datalink = "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/contents"

let rawcontentlink = ""

bot.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ")

    switch (args[0]) {
        case ';github':
            async function fetchgitdata() {
                try {
                    let filenames = []
                    if (!args[1]) { args[1] = "" }
                    let gitdata = (await (await fetch(datalink + '/' + args[1])).text());
                    gitdata = eval(gitdata)
                    let modnums = gitdata["length"]
                    for (let modlogs = 0; modlogs < modnums; modlogs++) {
                        if (gitdata[modlogs].type === 'dir') { gitdata[modlogs].type = 'folder' }
                        filenames.push((gitdata[modlogs].name) + '- Type: ' + (gitdata[modlogs].type))
                    }
                    filenames.join("\n")
                    let filegitstr = filenames.join("\n")

                    let fileembed = new Discord.MessageEmbed()
                        .setThumbnail('https://cdn.discordapp.com/attachments/719578195371884565/719588675851124816/og-image-removebg-preview.png')
                        .setTitle("<:githubsuccess:719971373317095547> Here are the Github files from " + datalink + '/' + args[1] + '.')
                        .setColor('#0099ff')
                        .setDescription('```' + filegitstr + '```')
                    message.channel.send(fileembed)
                } catch{
                    const errmessage = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("<:githuberror:719971585716387862> There was an internal error, possibly with the link. Make sure the file/folder you entered is valid. (Make sure to only run this command on folders.)")
                    message.channel.send(errmessage)
                    datalink = "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/contents"
                    rawcontentlink = ""

                }
            }
            fetchgitdata()
            break;

        case ';files':
            async function fetchrawdata() {
                try {
                    let rawname = []
                    if (!args[1]) { args[1] = "" }
                    let gitdata = (await (await fetch(datalink + '/' + args[1])).text());
                    gitdata = eval(gitdata)
                    let modnums = gitdata["length"]


                    for (let modlogs = 0; modlogs < modnums; modlogs++) {
                        rawname.push((gitdata[modlogs].download_url))

                    }
                    rawname.join("\n")
                    rawname = rawname.map(rawname => rawname ? rawname : "<:githuberror:719971585716387862> There is no raw data for this file.")
                    let gitstr = rawname.join("\n" + "" + "\n")
                    let fileembed = new Discord.MessageEmbed()
                        .setThumbnail('https://cdn.discordapp.com/attachments/719578195371884565/719588675851124816/og-image-removebg-preview.png')
                        .setTitle("<:githubsuccess:719971373317095547> Here are the raw file links from " + datalink + '/' + args[1] + '.')
                        .setColor('#0099ff')
                        .setDescription('**' + gitstr + '**')
                        .addField('Note:','The order of the files is respective to the order that they appear in `;github`.')
                    message.channel.send(fileembed)
                } catch{
                    const errmessage = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("<:githuberror:719971585716387862> There was an internal error, possibly with the link. Reverting link to default. Make sure the file/folder you entered is valid. (Make sure to only run this command on folders.)")
                    message.channel.send(errmessage)
                    datalink = "https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/contents"
                    rawcontentlink = ""

                }
            }
            fetchrawdata()
            break;

        case ';ping':
            var ping = Math.round(bot.ws.ping) + ' ms'
            const pingresponse = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Pong! Latency is ' + '`' + ping + '`')
            message.channel.send(pingresponse)
            break;

        case ';help':
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('ProdigyMathGameHacking')
                .setURL('https://github.com/Prodigy-Hacking/ProdigyMathGameHacking')
                .setAuthor('ProdigyMathGameHacking Github Bot help', 'https://github.com/Prodigy-Hacking/ProdigyMathGameHacking')
                .setDescription('This bot allows you to remotely access the ProdigyMathGameHacking Github!')
                .setThumbnail('https://cdn.discordapp.com/attachments/719578195371884565/719588675851124816/og-image-removebg-preview.png')
                .addField(';ping', 'Pong!', false)
                .addField(';tags', 'This shows the tags we use to organize our issues, such as `Invalid` or `Bug`.', false)
                .addField(';github', 'Shows all the root files in the Github. Add another argument if you want to enter a folder. *Usage - ;github [folder].* Eg: ;github hacks/Misc', false)
                .addField(';files', 'This is like the `;github` command, but instead of showing the file names, it shows the links for the actual code.', false)
                .addField(';repoinfo', 'This gives general info on the Github repository.', false)
                .addField(';collaborators', 'This shows the current people who are working on the Github.', false)
                .addField(';issues', 'This shows all open issues in the repository.', false)
                .addField(';traffic', 'Shows the amount of views that the Github has had this week.', false)
                .addField('***NOTE:***', '***Folder urls are case-sensitive. make sure you follow the capitalization EXACTLY as it is shown when you use `;github`.***', false)
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL);

            message.channel.send(helpEmbed);
            break;
        case ';repoinfo':
            async function fetchGenData() {
                let gendata = (await (await fetch('https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking')).json());
                const gendataembed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('ProdigyMathGameHacking repository - General data.')
                    .addField('Repository name:', gendata.name, false)
                    .addField('Description:', gendata.description, false)
                    .addField('Number of watches:', gendata.watchers, false)
                    .addField('Number of forks:', gendata.forks, false)
                    .addField('Api URL:', gendata.url, false)
                    .addField('Github URL:', gendata.svn_url, false)
                    .addField('Repo ID:', gendata.id, false)
                    .addField('Website:', gendata.homepage, false)
                    .addField('Current repository issues:', gendata.open_issues, false)
                    .addField('Owner/Organization:', gendata.organization.login, false)
                    .addField('License:', gendata.license.name, false)
                    message.channel.send(gendataembed)
            }
            fetchGenData()
            break;
        case ';collaborators':
async function fetchContData(){
    let contdata = (await(await fetch('https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/contributors')).json());
    let contnames = []
    let modnums = contdata["length"]
    for (let contlogs = 0; contlogs < modnums; contlogs++) {
        contdata.push('Username: ' + (contdata[contlogs].login) + '- Amount of commits: ' + (contdata[contlogs].contributions))
    }                
for (let contlogs = 0; contlogs < modnums; contlogs++) {
        contdata.shift()
    }
let contgitstr = contdata.join("\n")  
const contembed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('<:githubsuccess:719971373317095547> Here are the current Github contributors:')
.setDescription('```'+contgitstr+'```')
message.channel.send(contembed)
}
fetchContData()
break;          
  case ';issues':
      async function fetchIssueData(){
        let issuedata = (await(await fetch('https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/issues')).json());
        let issuenames = []
        let issuenums = issuedata["length"]
        for (let issuelogs = 0; issuelogs < issuenums; issuelogs++) {
            issuenames.push('Issue name: ' + (issuedata[issuelogs].title) + '. Submitted by: ' + (issuedata[issuelogs].user.login))
        }                
       let finalIssueData = issuenames.join('\n' + '\n')
        const issueEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('<:githubsuccess:719971373317095547> Here are the current open issues.')
    .setDescription('**'+finalIssueData+'**')
message.channel.send(issueEmbed)
}          
fetchIssueData()
break;
case ';tags':
    async function fetchTagData(){
        let tagdata = (await(await fetch('https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/labels')).json());
        let tagnames = []
        let tagnums = tagdata["length"]
        for (let taglogs = 0; taglogs < tagnums; taglogs++) {
            tagnames.push('Tag name: ' + (tagdata[taglogs].name) + '. Description: ' + (tagdata[taglogs].description))
        }                
       let finalTagData = tagnames.join('\n'+' \n')
       const tagembed = new Discord.MessageEmbed()
       .setColor('#0099ff')
       .setTitle('<:githubsuccess:719971373317095547> Here are the current issue tags.')
       .setDescription(finalTagData)
    message.channel.send(tagembed)
    }
    fetchTagData()
    break;
case ';traffic':
    async function fetchTrafficData(){
try{        let viewdata;
fetch('https://api.github.com/repos/Prodigy-Hacking/ProdigyMathGameHacking/traffic/views', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Authorization': 'Basic ' + btoa(credentials.login),
    },
})
  .then(response => response.json())
  .then(data => viewdata = data);
  setTimeout(function(){const trafficEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('<:githubsuccess:719971373317095547> Here is the current Github traffic.')
  .setDescription('Here is the traffic for this week: `'+viewdata.count+'`. Unique viewers: `'+viewdata.uniques+'`.\n Here is the traffic for today: Total views: `'+viewdata.views[viewdata.views.length-1].count+'`. Unique viewers: `'+ viewdata.views[viewdata.views.length-1].uniques+'`.')    
  message.channel.send(trafficEmbed)},1000)
  }catch{
      const trafficErr = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('<:githuberror:719971585716387862> I was not able to fetch the traffic data.')
  message.channel.send(trafficErr)
    }
}
fetchTrafficData()
break;
}}
)

bot.login(token.token);
