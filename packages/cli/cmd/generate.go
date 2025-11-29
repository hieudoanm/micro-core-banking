// Package cmd ...
package cmd

import (
	"fmt"
	"os"
	"path/filepath"
	"qrcode-cli/utils/figlet"

	"github.com/spf13/cobra"

	qrcode "github.com/skip2/go-qrcode"
)

// generateCmd represents the qrcode command
var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a QR code from a URL",
	Long: `Generate a QR code image from a given URL.

This command prompts the user to input a URL and generates a PNG QR code
file named "qrcode.png" in the current executable's directory.

Example usage:
  qrcode-cli generate
  (then enter a URL when prompted)

The generated QR code uses the highest error correction level and a 256x256 size.`,
	Run: func(cmd *cobra.Command, args []string) {
		figlet.LogProgramName()
		// Get URL
		fmt.Print("URL: ")
		var url string
		fmt.Scanln(&url)
		err := qrcode.WriteFile(url, qrcode.Highest, 256, "qrcode.png")
		if err != nil {
			panic(err)
		}
		ex, err := os.Executable()
		if err != nil {
			panic(err)
		}
		exPath := filepath.Dir(ex)
		fmt.Println("QR code saved to:", exPath)
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)
}
