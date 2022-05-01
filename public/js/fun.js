function main() {
    const source = "Hello, Barybians!" // Expected result: <u><b>Hello</b>, <i>Barybians!</i></u>
    const attachments = listOf(
        Attachment(0, 5, "<b>", "</b>"),
        Attachment(7, 10, "<i>", "</i>"),
        Attachment(0, 17, "<u>", "</u>")
    ).sortedWith(compareBy<Attachment> { it.offset }.thenByDescending { it.length })

    var result = ""
    var currentIndex = 0
    var sourceIndex = 0
    var lastIndex = source.length
    for (attachment in attachments) {
        lastIndex += (attachment.openTag.length + attachment.closeTag.length)
    }

    while (currentIndex in 0..lastIndex) {
        while (attachments.any { attachment -> attachment.offset == currentIndex || (attachment.offset + attachment.length) == currentIndex }) {
            for (attachment in attachments) {
                if (attachment.offset == currentIndex) {
                    result += attachment.openTag
                    for (attachment2 in attachments.filterNot { it == attachment }) {
                        if (attachment2.offset >= currentIndex) {
                            attachment2.offset += attachment.openTag.length
                        }
                        if (attachment2.offset < currentIndex && (attachment.offset + attachment2.length) >= currentIndex) {
                            attachment2.length += attachment.openTag.length
                        }
                    }
                    currentIndex += attachment.openTag.length
                    attachment.length += attachment.openTag.length
                } else if ((attachment.offset + attachment.length) == currentIndex) {
                    result += attachment.closeTag
                    for (attachment2 in attachments.filterNot { it == attachment }) {
                        if (attachment2.offset >= currentIndex) {
                            attachment2.offset += attachment.closeTag.length
                        }
                        if ((attachment.offset + attachment2.length) >= currentIndex) {
                            attachment2.length += attachment.closeTag.length
                        }
                    }
                    currentIndex += attachment.closeTag.length
                }
            }
        }
        if (sourceIndex < source.length) {
            result += source[sourceIndex++]
        }
        currentIndex++
    }
    print(result)
}
data class Attachment(
    var offset: Int,
    var length: Int,
    val openTag: String,
    val closeTag: String
) {
    override fun toString(): String = "[$offset, $length]"
}