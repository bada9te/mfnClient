const reportReasons = [
    {
        id: "copyright",
        title: "Copyright Infringement",
        description: "The track may be uploaded without proper authorization or might be a duplicate of copyrighted material."
    },
    {
        id: "explicit",
        title: "Explicit Content",
        description: "The track contains explicit or inappropriate content that doesn’t comply with the app’s guidelines or is deemed offensive."
    },
    {
        id: "poor",
        title: "Poor Quality",
        description: "The audio quality is very poor, such as having excessive noise, distortion, or being unrecognizable."
    },
    {
        id: "mislabeling",
        title: "Mislabeling",
        description: "The track is mislabeled, which could mean it’s not what it claims to be or is incorrectly tagged with the wrong artist, genre, or album."
    },
    {
        id: "spam",
        title: "Spam or Malware",
        description: "The track is used to spread spam or malware, either through malicious links in the description or by infecting users’ devices."
    },
    {
        id: "technical",
        title: "Technical Issues",
        description: "Users might report tracks that fail to play or have technical issues that affect the user experience."
    },
    {
        id: "false-info",
        title: "Misleading or False Information",
        description: "The track might come with misleading or false information in the metadata, such as incorrect artist credits or misleading descriptions."
    },
    {
        id: "redundant",
        title: "Repetitive or Redundant Content",
        description: "The track is a duplicate or is excessively similar to other tracks, leading to unnecessary clutter on the platform."
    },
    {
        id: "offensive",
        title: "Offensive or Harmful Content",
        description: "The track contains content that promotes hate speech, violence, or other harmful behaviors."
    }
]

export default reportReasons;