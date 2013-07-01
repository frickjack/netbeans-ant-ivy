/**
 * Little jnlp and .jar rewrite script for the
 * peculiar way Reuben publishes jnlp webapps to
 * webapp containers
 */
 
import java.io.File
import java.util.logging.{Level,Logger}
import java.util.regex._
import scala.collection.JavaConversions._

class Fixer ( val workDir:File ) extends Runnable {
    private val log = Logger.getLogger( getClass.getName )

    if ( (! workDir.exists) || (! workDir.isDirectory)) {
        throw new IllegalArgumentException( workDir.getAbsolutePath + " is not a directory" )
    }

    /**
     * Rename files of form bla-\d+.\d+.zSnapshot.jar(.pack)? to bla-number.bCURRENTTIME.jar(...)
     *
     * @return map from bla to bla...bCURRENTTIME.jar jar name to help with jnlp rewrite
     */
    def renameSnapJars( files:Seq[File] ):Map[String,String] = Map.empty
    
    override def run():Unit = {
        log.log( Level.INFO, "Processing " + workDir.getAbsolutePath )
        val files = workDir.listFiles.filter( (child) => child.isFile )
        val jarMap = renameSnapJars( files )
    }

}

 
if( args.length < 1 ) {
     throw new IllegalArgumentException( "Must specify jnlp build directory - ex: build/web/jar" );
}

(new Fixer( new File( args(0) ) )).run()

